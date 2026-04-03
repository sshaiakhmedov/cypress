import { HomePage } from '../../../pages/Home.page';
import { SameDayCarePage } from '../../../pages/SameDayCare.page';
import { VirtualCarePage } from '../../../pages/VirtualCare.page';

describe('Virtual Care Flow', () => {
  const home = new HomePage();
  const sameDayCare = new SameDayCarePage();
  const virtualCare = new VirtualCarePage();

  it('navigates from home to virtual care page and toggles all FAQ chevrons', () => {
    // 2. Navigate to Home
    home.goto();

    // 3. Click "Same-day care"
    home.sameDayCareLink.click();

    // 4. Click "Get started"
    sameDayCare.getStartedButton.click();

    // 5. Assert navigation to Virtual Care
    cy.url().should('include', '/virtual-care');

    // 6. Asserting all chevrons accordingly
    virtualCare.faqAccordionButtons.should('have.length.greaterThan', 0).each(($btn, index) => {
      const panelId = $btn.attr('aria-controls');
      
      // Log for clarity in Cypress runner
      cy.log(`Checking Chevron ${index + 1}`);

      // Chevron is initially closed
      cy.wrap($btn).should('have.attr', 'aria-expanded', 'false');
      if (panelId) virtualCare.getFaqPanel(panelId).should('not.be.visible');

      // Click to open chevron
      cy.wrap($btn).click();

      // Assert it is opened and its panel is visible
      cy.wrap($btn).should('have.attr', 'aria-expanded', 'true');
      if (panelId) virtualCare.getFaqPanel(panelId).should('be.visible');

      // Click again to close it
      cy.wrap($btn).click();

      // Assert it is closed again and panel is no longer visible
      cy.wrap($btn).should('have.attr', 'aria-expanded', 'false');
      if (panelId) virtualCare.getFaqPanel(panelId).should('not.be.visible');
    });
  });
});
