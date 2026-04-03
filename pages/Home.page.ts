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

  get sameDayCareLink() {
    return cy.get('header#shc-main-header').contains('Same-day care');
  }

  goto() {
    cy.visit('/');
  }
}
