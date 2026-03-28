export class HomePage {
  get logo() {
    return cy.get('header#shc-main-header a[aria-label="Sharp logo"]');
  }

  get findADoctorLink() {
    return cy.get('header#shc-main-header a[href="/doctors"]');
  }

  get findADoctorHeroButton() {
    return cy.get('section#homepage-hero a[href="/doctors"]').first();
  }

  goto() {
    cy.visit('/');
  }
}
