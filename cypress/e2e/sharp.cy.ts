import { HomePage } from '../../pages/Home.page';

describe('Sharp.com Basic Test', () => {
  const home = new HomePage();

  beforeEach(() => {
    home.goto();
  });

  it('should load the home page', () => {
    cy.title().should('include', 'Sharp');
  });

  it('should have a visible logo', () => {
    home.logo.should('be.visible');
  });

  it('should have a "Find a Doctor" link in the header', () => {
    home.findADoctorLink.should('be.visible');
  });
});
