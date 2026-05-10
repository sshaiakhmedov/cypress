import { MVIDEO_BASE_URL } from '../constants/mvideo';

export class MvideoLandingPage {
  get searchInput() {
    return cy.get('.main-search__input').filter(':visible').first();
  }

  get searchActionsContainer() {
    return cy.get('.main-search__actions');
  }

  get searchSubmitButton() {
    return this.searchActionsContainer.find('button.main-search__submit');
  }

  get resultsHeading() {
    return cy.get('h1.listing-page-title__heading', { timeout: 20000 });
  }

  get resultsCount() {
    return cy.get('.listing-page-title__count');
  }

  get productCards() {
    return cy.get('mvid-product-info');
  }

  get productNames() {
    return this.productCards.find('span.name');
  }

  private get closeAriaSelector() {
    return 'button[aria-label="Закрыть"], [role="button"][aria-label="Закрыть"]';
  }

  private get clickableControlsSelector() {
    return 'button, [role="button"], a';
  }

  get locationPopup() {
    // Using .first() in case there are multiple, and a longer timeout since popups can be slow to appear
    const popup = () => cy.get('.location-interactive', { timeout: 10000 }).first();
    popup.confirmButton = () => popup().contains('button', 'Все верно');
    popup.denyButton = () => popup().find('.location-deny');
    return popup;
  }

  goto() {
    cy.visit(MVIDEO_BASE_URL);
    this.waitForLandingShell();
  }

  waitForLandingShell() {
    cy.document().its('readyState').should('eq', 'complete');
    this.searchInput.should('exist');
  }

  closeLocationPopup() {
    this.locationPopup.confirmButton().click();
  }

  searchFor(query: string) {
    this.searchInput.should('be.visible').should('not.be.disabled');
    this.searchInput.clear({ force: true });
    this.searchInput.type(query, { delay: 15 });

    // Click the search button within the actions container
    this.searchSubmitButton.click({ force: true });
  }

  assertSearchResultsUrlContainsQuery(query: string) {
    cy.url({ timeout: 20000 }).should('include', '/search');
    cy.url().then((href) => {
      const q = new URL(href).searchParams.get('q');
      expect(q, 'query string ?q=').to.eq(query);
    });
  }

  assertSearchResultsVisible(query: string) {
    // 1. Check the main heading contains the query (using a more flexible match)
    this.resultsHeading
      .should('be.visible')
      .invoke('text')
      .then((text) => {
        const normalizedText = text.toLowerCase().replace(/-/g, ' ');
        const normalizedQuery = query.toLowerCase().replace(/-/g, ' ');
        // Check if at least one word from the query is in the heading
        const words = normalizedQuery.split(' ');
        const matches = words.some((word) => normalizedText.includes(word));
        expect(matches, `Heading "${text}" should relate to "${query}"`).to.be.true;
      });

    // 2. Check that results count is visible
    this.resultsCount.should('be.visible');

    // 3. Confirm at least one product card is rendered
    this.productCards.should('have.length.at.least', 1);
  }

  assertProductTitlesContain(query: string) {
    const normalizedQuery = query.toLowerCase().replace(/-/g, ' ');
    const queryWords = normalizedQuery.split(' ').filter((w) => w.length > 2);

    // Check first few products to ensure they are relevant
    this.productNames.should('have.length.at.least', 1).then(($els) => {
      const titles = $els
        .toArray()
        .slice(0, 3)
        .map((el) => (el as HTMLElement).innerText.toLowerCase().replace(/-/g, ' '));
      // At least one of the top 3 items should contain at least one significant word from the query
      const anyMatch = titles.some((title) => queryWords.some((word) => title.includes(word)));
      expect(anyMatch, `At least one of the top products should match "${query}"`).to.be.true;
    });
  }

  clickSearchInput() {
    this.searchInput.click();
  }

  assertSearchInputContains(query: string) {
    this.searchInput.should('have.value', query);
  }
}
