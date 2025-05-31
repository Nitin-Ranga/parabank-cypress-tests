/**
 * Project: Ixigo Flight Booking Automation using Cypress
 * Framework: TDD Style (Test-Driven Development)
 * Structure: Single Spec File (No Page Object Model)
 * Type: End-to-End UI Testing (without mocking APIs)
 *
 * Key Notes:
 * - This automation flow simulates selecting the Indigo airline on ixigo.com,
 *   entering source and destination cities, selecting departure & return dates,
 *   and performing a flight search.
 *
 * Limitation 
 * - Even though valid search parameters are used, the site returns
 *   "No results found" immediately after clicking Search.This is likely due to bot/automation blocking by the Ixigo website, 
 *    where internal JS events or tracking mechanisms fail to register
 * 
 * Strategy:
 * - Uses `.click({ force: true })` to handle dynamic UI elements.
 * - Uses `cy.wait()` to ensure transitions and animations complete.
 * - Uses `delay` inside `.type()` to simulate more realistic typing (human-like input).
 */

describe("Ixigo Flight Tests", () => {
  before(() => {
    // Prevent app crashes from failing the test
    Cypress.on("uncaught:exception", () => false);

    // Visit the site once before the full flow
    cy.visit("https://www.ixigo.com/");
    cy.wait(3000);
    cy.viewport(1280, 720); // Set viewport size for better visibility
  });

  it("Visit Indigo airline page", () => {
    cy.get('[href="/airlines/indigo-6e"] > .relative > [data-testid="airline-logo"]')
      .click({ force: true });
    cy.url().should("include", "/airlines/indigo-6e");
    cy.wait(2000);

    // TC 2 - Search the Flight from city 
    cy.get('input[placeholder="Enter city or airport"]').first().type("CCU",{ delay: 100 });
    cy.contains("Kolkata, India").click({ force: true });
    cy.wait(2000);
    cy.get('input[placeholder="Enter city or airport"]').eq(1).type("DEL",{ delay: 100 });
    cy.contains("Delhi, India").click({ force: true });
    cy.wait(2000);

    // Select Departure Date
    cy.get('.from-date > .c-input-cntr > .c-input').click({ force: true }); 
    cy.wait(3000);
    cy.get(':nth-child(2) > .ixi-icon-arrow').click({ force: true }); // Navigate from May ➝ June
    cy.wait(300);
    cy.get('[data-date="26062025"] > .day').click({ force: true }); // Select June 26, 2025
    cy.wait(2000);

    // Select Return Date
    cy.wait(300);
    cy.get('.to-date > .c-input-cntr > .c-input').click({ force: true });
    cy.get('.flight-ret-cal > .rd-date > :nth-child(2) > .ixi-icon-arrow').click({ multiple: true }); // June ➝ August
    cy.wait(3000);
    cy.get('[data-date="26082025"] > .day').click({ force: true }); // Select August 26, 2025
    cy.wait(2000);

    // Trigger Search
    cy.contains("Search").click({ force: true });
    cy.wait(10000); // Wait to allow result (or error) to appear
    cy.url().should("include", "/search/result"); // Check if search results page is loaded
    cy.contains('No flights found!').should('be.visible');

    //cy.get('No flights found!').should('exist'); // Check for "No results found" message
    cy.screenshot("Search-Results");
  });
});
