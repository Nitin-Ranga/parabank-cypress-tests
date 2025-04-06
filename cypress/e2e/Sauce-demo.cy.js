describe('Saucedemo - Session Login Flow', () => {
    // beforeEach hook that uses Cypress's session command to handle login.
    // The 'saucedemo-login' is a unique ID for this session.
    // The setup function (the first argument to cy.session) will only run if a session
    // with this ID doesn't exist or is invalid.
    beforeEach(() => {
      cy.session('saucedemo-login', () => {
        // Inside the session setup, we load user credentials from a fixture file.
        cy.fixture('user').then((user) => {
          cy.visit('/');
          cy.get('[data-test="username"]').type(user.username);
          cy.get('[data-test="password"]').type(user.password);
          cy.get('[data-test="login-button"]').click();
          // After successful login, we assert that the URL includes the inventory page.
          cy.url().should('include', '/inventory.html');
          // We also assert that a key element of the inventory page is visible,
          // which helps confirm that the login was successful.
          cy.get('.inventory_container').should('be.visible');
        });
      }, {
        // The validate function (the second argument to cy.session) is used to determine
        // if an existing session is still valid. If it returns true, the setup function
        // is skipped, and the existing session is used.
        validate() {
          // We check if the inventory container is still visible. If it is, we assume
          // the user is still logged in and the session is valid.
          return cy.get('.inventory_container').should('be.visible');
        },
      });
    });
  
    // This beforeEach hook runs before each test case *after* the session is handled.
    // It ensures that we are on the inventory page before each test. If the session
    // was restored, this visit will be very fast.
    beforeEach(() => {
      cy.visit('/inventory.html');
    });
  
    // Declare variables to store the prices of the items. These are declared
    // outside the 'it' blocks so that they can be accessed by other test cases
    // within this 'describe' block.
    let price1;
    let price2;
  
    it('TC1 - Add Backpack and store price', () => {
      cy.contains('Sauce Labs Backpack')
        .parents('.inventory_item')
        .within(() => {
          // Get the price element and extract its text content.
          cy.get('.inventory_item_price').invoke('text').then((text) => {
            // The price text includes a '$' sign. We remove it using .replace('$', '')
            // and then convert the remaining string to a floating-point number using parseFloat().
            price1 = parseFloat(text.replace('$', ''));
          });
          cy.contains('Add to cart').click();
        });
    });
  
    it('TC2 - Add T-Shirt and store price', () => {
      cy.contains('Sauce Labs Bolt T-Shirt')
        .parents('.inventory_item')
        .within(() => {
          // Similar to TC1, we get the price text, remove the '$', and convert it to a float.
          cy.get('.inventory_item_price').invoke('text').then((text) => {
            price2 = parseFloat(text.replace('$', ''));
          });
          cy.contains('Add to cart').click();
        });
    });
  
    it('TC3 - Checkout and verify total price', () => {
      // Calculate the expected total price by adding the stored prices of the two items.
      const expectedTotal = price1 + price2;
  
      cy.get('.shopping_cart_link').click();
      cy.url().should('include', '/cart.html');
      cy.get('[data-test="checkout"]').click();
      cy.url().should('include', '/checkout-step-one.html');
  
      cy.get('[data-test="firstName"]').type('Nitin');
      cy.get('[data-test="lastName"]').type('QA');
      cy.get('[data-test="postalCode"]').type('700001');
      cy.get('[data-test="continue"]').click();
      cy.url().should('include', '/checkout-step-two.html');
  
      cy.get('.summary_subtotal_label').invoke('text').then((text) => {
        // Again, parse the displayed total price by removing the "Item total: $" prefix
        // and converting it to a floating-point number.
        const actualTotal = parseFloat(text.replace('Item total: $', ''));
        // Finally, we assert that the actual total displayed on the page matches our expected total.
        expect(actualTotal).to.equal(expectedTotal);
      });
    });
  
    it('TC4 - Verify Item Details Page', () => {
      cy.contains('Sauce Labs Backpack').click();
      cy.url().should('include', '/inventory-item.html');
      cy.get('.inventory_item_name').should('have.text', 'Sauce Labs Backpack');
      cy.get('.inventory_item_desc').should('not.be.empty');
      cy.visit('/inventory.html');
    });
  
    it('TC5 - Add and Remove Item from Cart on Inventory Page', () => {
      cy.contains('Sauce Labs Bike Light')
        .parents('.inventory_item')
        .within(() => {
          cy.contains('Add to cart').click();
          cy.get('button').should('have.text', 'Remove');
        });
      cy.get('.shopping_cart_badge').should('have.text', '1');
  
      cy.contains('Sauce Labs Bike Light')
        .parents('.inventory_item')
        .within(() => {
          cy.contains('Remove').click();
          cy.get('button').should('have.text', 'Add to cart');
        });
      cy.get('.shopping_cart_badge').should('not.exist');
    });
  
    it('TC6 - Verify Cart Contents', () => {
      cy.get('.shopping_cart_link').click();
      cy.url().should('include', '/cart.html');
      cy.get('.cart_item').should('have.length', 2);
  
      cy.get('.cart_item:contains("Sauce Labs Backpack")')
        .within(() => {
          cy.get('.inventory_item_name').should('have.text', 'Sauce Labs Backpack');
          cy.get('.cart_quantity').should('have.text', '1');
          cy.get('.inventory_item_price').should('have.text', '$' + price1);
        });
  
      cy.get('.cart_item:contains("Sauce Labs Bolt T-Shirt")')
        .within(() => {
          cy.get('.inventory_item_name').should('have.text', 'Sauce Labs Bolt T-Shirt');
          cy.get('.cart_quantity').should('have.text', '1');
          cy.get('.inventory_item_price').should('have.text', '$' + price2);
        });
    });
  
    it('TC7 - Continue Shopping Functionality', () => {
      cy.get('#continue-shopping').click();
      cy.url().should('include', '/inventory.html');
    });
  
    it('TC8 - Verify Checkout Information Page Errors', () => {
    
      cy.get('.shopping_cart_link').click();
      cy.url().should('include', '/cart.html');
      cy.get('[data-test="checkout"]').click();
      cy.url().should('include', '/checkout-step-one.html');
      cy.get('[data-test="continue"]').click();
  
      cy.get('[data-test="error"]')
        .should('be.visible')
        .should('contain', 'Error: First Name is required');
  
      cy.get('[data-test="firstName"]').type('Nitin');
      cy.get('[data-test="continue"]').click();
      cy.get('[data-test="error"]')
        .should('be.visible')
        .should('contain', 'Error: Last Name is required');
  
      cy.get('[data-test="lastName"]').type('QA');
      cy.get('[data-test="continue"]').click();
      cy.get('[data-test="continue"]').click();
      cy.get('[data-test="error"]')
        .should('be.visible')
        .should('contain', 'Error: Postal Code is required');
    });
    it('TC9 - Verify Checkout Step Two Page', () => {
        // This test case navigates to the Checkout Step Two page (the overview page)
        // after filling in the checkout information and verifies the presence of key elements
        // that confirm the user is on the correct page and can proceed with the order.
    
        // Navigate to the cart and then to the checkout information page, filling in details
        // to proceed to the checkout overview page.
        cy.get('.shopping_cart_link').click();
        cy.url().should('include', '/cart.html');
        cy.get('[data-test="checkout"]').click();
        cy.url().should('include', '/checkout-step-one.html');
    
        cy.get('[data-test="firstName"]').type('Nitin');
        cy.get('[data-test="lastName"]').type('QA');
        cy.get('[data-test="postalCode"]').type('700001');
        cy.get('[data-test="continue"]').click();
        cy.url().should('include', '/checkout-step-two.html');
    
        // Assert that the summary information section is visible.
        cy.get('.summary_info').should('be.visible');
        // Assert that the label for the quantity of items is visible.
        cy.get('.cart_quantity_label').should('be.visible');
        // Assert that the label for the description of items is visible.
        cy.get('.cart_desc_label').should('be.visible');
        // Assert that the label for the item subtotal is visible.
        cy.get('.summary_subtotal_label').should('be.visible');
        // Assert that the label for the tax amount is visible.
        cy.get('.summary_tax_label').should('be.visible');
        // Assert that the label for the final total amount is visible.
        cy.get('.summary_total_label').should('be.visible');
        // Assert that the 'FINISH' button is visible, allowing the user to place the order.
        cy.get('[data-test="finish"]').should('be.visible');
        // Assert that the 'CANCEL' button is visible, allowing the user to go back.
        cy.get('[data-test="cancel"]').should('be.visible');
      });
    
      it('TC10 - Calculate and Verify Total Order Amount', () => {
        // This test case focuses on the Checkout Overview page (step two of checkout).
        // It navigates to this page and then verifies the accuracy of the final total
        // displayed to the user by calculating it based on the item total and the tax.
    
        // Navigate to the cart and then to the checkout information page, filling in details
        // to proceed to the checkout overview page.
        cy.get('.shopping_cart_link').click();
        cy.url().should('include', '/cart.html');
        cy.get('[data-test="checkout"]').click();
        cy.url().should('include', '/checkout-step-one.html');
    
        cy.get('[data-test="firstName"]').type('Nitin');
        cy.get('[data-test="lastName"]').type('QA');
        cy.get('[data-test="postalCode"]').type('700001');
        cy.get('[data-test="continue"]').click();
        cy.url().should('include', '/checkout-step-two.html');
    
        // Get the item total.
        cy.get('.summary_subtotal_label').invoke('text').then((subtotalText) => {
          const itemTotal = parseFloat(subtotalText.replace('Item total: $', ''));
    
          // Get the tax amount.
          cy.get('.summary_tax_label').invoke('text').then((taxText) => {
            const tax = parseFloat(taxText.replace('Tax: $', ''));
    
            // Get the final total amount displayed.
            cy.get('.summary_total_label').invoke('text').then((totalText) => {
              const finalTotal = parseFloat(totalText.replace('Total: $', ''));
    
              // Calculate the expected total by adding the item total and the tax.
              const expectedTotal = itemTotal + tax;
    
              // Assert that the calculated expected total matches the final total displayed.
              expect(finalTotal).to.equal(expectedTotal);
            });
          });
        });
      });
    
      it('TC11 - Click Finish Button and Verify Order Placement', () => {
        // This test case navigates through the checkout process and verifies that
        // clicking the 'FINISH' button successfully places the order, leading to
        // the checkout complete page with a success message.
        // Click the 'FINISH' button to place the order.
        cy.get('[data-test="finish"]').click();
    
        // Assert that the URL includes the checkout complete page.
        cy.url().should('include', '/checkout-complete.html');
        // Assert that the complete header displays the success message.
        cy.get('.complete-header').should('have.text', 'THANK YOU FOR YOUR ORDER');
        // Assert that the complete text contains a confirmation message about the order dispatch.
        cy.get('.complete-text').should('contain', 'Your order has been dispatched');
      });
  });