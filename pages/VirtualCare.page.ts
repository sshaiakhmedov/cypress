export class VirtualCarePage {
  get faqsSection() {
    return cy.get('#about-virtual-care-faqs');
  }

  get faqAccordionButtons() {
    // Selects all buttons inside the FAQ section that act as accordion toggles
    return this.faqsSection.find('button[aria-expanded]');
  }

  getFaqPanel(panelId: string) {
    return cy.get(`#${panelId}`);
  }

  goto() {
    cy.visit('/virtual-care');
  }
}
