const findAdoctorMenu: string = 'Find a Doctor';

describe('Go to Sharp.Com Home page', () => {
  beforeEach(() => {
    cy.viewport(1900, 1200);
  });
  it('Shall have "Find a Doctor" doctor menu in Nav Bar', () => {
    cy
      .visit('/')
      .get('#header-nav-fad')
      .should('have.text', findAdoctorMenu);
  });

  it('Shall land on the Page with 3 "Find a..." options', () => {
    cy
      .get('#header-nav-fad').click()
      .get('#primary-care-doctor-drawer-open > span')
      .should('have.length', 1)
      .should('be.visible');
  });
});
