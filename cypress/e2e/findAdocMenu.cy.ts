import { HomePage } from '../../pages/Home.page';

describe('Sharp.com Navigation', () => {
  const home = new HomePage();

  beforeEach(() => {
    cy.viewport(1280, 720);
    home.goto();
  });

  it('should navigate to "Find a Doctor" page via header link', () => {
    home.findADoctorLink.click();
    cy.url().should('include', '/doctors');
    cy.get('h1').should('contain', 'Find a doctor');
  });

  it('should navigate to "Find a Doctor" page via hero button', () => {
    home.findADoctorHeroButton.click();
    cy.url().should('include', '/doctors');
    cy.get('h1').should('contain', 'Find a doctor');
  });
});
