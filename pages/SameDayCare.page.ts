export class SameDayCarePage {
  get getStartedButton() {
    return cy.get('#button-1').contains('Get started');
  }

  goto() {
    cy.visit('/same-day-care');
  }
}
