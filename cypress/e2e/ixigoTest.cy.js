import FlightSearchPage from "../support/ixigo";

const flightPage = new FlightSearchPage();

describe("Ixigo Flight Search using POM", () => {
  before(() => {
    cy.viewport("macbook-13");
    Cypress.on("uncaught:exception", () => false);
    flightPage.visitHomePage();
    flightPage.acceptPopupIfVisible();
  });

  it("Search flights from CCU to DEL", () => {
    flightPage.goToIndigoPage();
    flightPage.selectFromCity("CCU");
    flightPage.selectToCity("DEL");
    flightPage.selectDepartureDate("26062025");
    flightPage.selectReturnDate("26082025");
    flightPage.clickSearch();
  });
});
