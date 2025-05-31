describe("Parabank E2E Tests", () => {
  beforeEach(() => {
    cy.viewport("macbook-13");
    Cypress.on("uncaught:exception", () => false);
    cy.visit("https://parabank.parasoft.com/parabank/register.htm"); 
  });

  it("Lets Register into the system", () => {
    cy.get('[id="customer.firstName"]').type("John");
    cy.get('[id="customer.lastName"]').type("Doe");
    cy.get('[id="customer.address.street"]').type("123 Main St");
    cy.get('[id="customer.address.city"]').type("New York");
    cy.get('[id="customer.address.state"]').type("NY");
    cy.get('[id="customer.address.zipCode"]').type("10001");
    cy.get('[id="customer.phoneNumber"]').type("1234567890");
    cy.get('[id="customer.ssn"]').type("123-45-6789");
    cy.get('[id="customer.username"]').type("john_doe_test");
    cy.get('[id="customer.password"]').type("Test@1234");
    cy.get('[id="repeatedPassword"]').type("Test@1234");
    
    // Submit the form
    cy.get('[value="Register"]').click();

    // Assertion
    cy.contains("Your account was created successfully").should("be.visible");
  });
});
