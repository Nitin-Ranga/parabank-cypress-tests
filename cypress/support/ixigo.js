class FlightSearchPage {
  visitHomePage() {
    cy.visit("https://www.ixigo.com/");
    cy.wait(3000);
  }

  acceptPopupIfVisible() {
    // Optional: Dismiss any popups if visible
    cy.get('body').then(($body) => {
      if ($body.find('.some-popup-selector').length > 0) {
        cy.get('.some-popup-close-button').click({ force: true });
      }
    });
  }

  goToIndigoPage() {
    cy.get('[href="/airlines/indigo-6e"] > .relative > [data-testid="airline-logo"]')
      .click({ force: true });
    cy.url().should("include", "/airlines/indigo-6e");
    cy.wait(2000);
  }

  selectFromCity(cityCode) {
    cy.get('input[placeholder="Enter city or airport"]').first().type(cityCode, { delay: 100 });
    cy.contains("Kolkata, India").click({ force: true });
    cy.wait(2000);
  }

  selectToCity(cityCode) {
    cy.get('input[placeholder="Enter city or airport"]').eq(1).type(cityCode, { delay: 100 });
    cy.contains("Delhi, India").click({ force: true });
    cy.wait(2000);
  }

  selectDepartureDate(date) {
    cy.get('.from-date > .c-input-cntr > .c-input').click({ force: true });
    cy.wait(3000);
    cy.get(':nth-child(2) > .ixi-icon-arrow').click({ force: true });
    cy.wait(300);
    cy.get(`[data-date="${date}"] > .day`).click({ force: true });
    cy.wait(2000);
  }

  selectReturnDate(date) {
    cy.get('.to-date > .c-input-cntr > .c-input').click({ force: true });
    cy.get('.flight-ret-cal > .rd-date > :nth-child(2) > .ixi-icon-arrow').click({ multiple: true });
    cy.wait(3000);
    cy.get(`[data-date="${date}"] > .day`).click({ force: true });
    cy.wait(2000);
  }

  clickSearch() {
    cy.contains("Search").click({ force: true });
    cy.wait(10000);
  }
}

export default FlightSearchPage;
