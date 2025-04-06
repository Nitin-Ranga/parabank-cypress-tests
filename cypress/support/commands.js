// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


import { faker } from '@faker-js/faker';

Cypress.Commands.add('generateFakeUser', () => {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  };
});
Cypress.Commands.add('generateFakeAddress', () => {
  return {
    street: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode()
  };
});
Cypress.Commands.add('generateFakeCompany', () => {
  return {
    name: faker.company.name(),
    catchPhrase: faker.company.catchPhrase(),
    bs: faker.company.bs()
  };
});
Cypress.Commands.add('generateFakeProduct', () => {
  return {
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    department: faker.commerce.department()
  };
});
Cypress.Commands.add('generateFakeText', () => {
  return {
    sentence: faker.lorem.sentence(),
    paragraph: faker.lorem.paragraph(),
    words: faker.lorem.words()
  };
});
Cypress.Commands.add('generateFakeImage', () => {
  return {
    imageUrl: faker.image.imageUrl(),
    avatarUrl: faker.image.avatar(),
    businessLogo: faker.image.business()
  };
});
Cypress.Commands.add('generateFakeDate', () => {
  return {
    pastDate: faker.date.past(),
    futureDate: faker.date.future(),
    recentDate: faker.date.recent()
  };
});
Cypress.Commands.add('generateFakePhoneNumber', () => {
  return {
    phoneNumber: faker.phone.number(),
    phoneNumberFormat: faker.phone.phoneNumberFormat(),
    phoneNumberType: faker.phone.phoneNumberType()
  };
});
Cypress.Commands.add('generateFakeUUID', () => {
  return {
    uuid: faker.string.uuid()
  };
});
Cypress.Commands.add('generateFakeJob', () => {
  return {
    title: faker.person.jobTitle(),
    descriptor: faker.person.jobDescriptor(),
    noun: faker.person.jobNoun()
  };
});
Cypress.Commands.add('generateFakeFinance', () => {
  return {
    account: faker.finance.account(),
    amount: faker.finance.amount(),
    transactionType: faker.finance.transactionType()
  };
});
Cypress.Commands.add('generateFakeVehicle', () => {
  return {
    vehicle: faker.vehicle.vehicle(),
    manufacturer: faker.vehicle.manufacturer(),
    model: faker.vehicle.model()
  };
});
Cypress.Commands.add('generateFakeFood', () => {
  return {
    food: faker.food.food(),
    ingredient: faker.food.ingredient(),
    dish: faker.food.dish()
  };
});
Cypress.Commands.add('generateFakeColor', () => {
  return {
    color: faker.color.human(),
    hexColor: faker.color.rgb()
  };
});
Cypress.Commands.add('generateFakeMusic', () => {
  return {
    genre: faker.music.genre(),
    songName: faker.music.songName(),
    instrument: faker.music.instrument()
  };
});
Cypress.Commands.add('generateFakeWebsite', () => {
  return {
    domainName: faker.internet.domainName(),
    url: faker.internet.url(),
    protocol: faker.internet.protocol()
  };
});
Cypress.Commands.add('generateFakeTextFormat', () => {
  return {
    text: faker.lorem.text(),
    word: faker.lorem.word(),
    words: faker.lorem.words()
  };
});
Cypress.Commands.add('generateFakeRandom', () => {
  return {
    number: faker.number.int(),
    float: faker.number.float(),
    arrayElement: faker.helpers.arrayElement(['apple', 'banana', 'cherry'])
  };
});
Cypress.Commands.add('generateFakeImageData', () => {
  return {
    image: faker.image.image(),
    avatar: faker.image.avatar(),
    business: faker.image.business()
  };
});
Cypress.Commands.add('generateFakeLocation', () => {
  return {
    latitude: faker.location.latitude(),
    longitude: faker.location.longitude(),
    city: faker.location.city()
  };
});
Cypress.Commands.add('generateFakeInternet', () => {
  return {
    email: faker.internet.email(),
    userName: faker.internet.userName(),
    password: faker.internet.password()
  };
});
Cypress.Commands.add('generateFakeRandomNumber', () => {
  return {
    randomNumber: faker.number.int({ min: 0, max: 100 })
  };
});
Cypress.Commands.add('generateFakeRandomString', () => {
  return {
    randomString: faker.string.alphanumeric(10)
  };
});
Cypress.Commands.add('generateFakeRandomBoolean', () => {
  return {
    randomBoolean: faker.datatype.boolean()
  };
});
Cypress.Commands.add('generateFakeRandomDate', () => {
  return {
    randomDate: faker.date.past()
  };
});
Cypress.Commands.add('generateFakeRandomArray', () => {
  return {
    randomArray: faker.helpers.arrayElements(['apple', 'banana', 'cherry'], 2)
  };
});
Cypress.Commands.add('generateFakeRandomObject', () => {
  return {
    randomObject: faker.helpers.objectElement({ name: 'John', age: 30, city: 'New York' })
  };
});
Cypress.Commands.add('generateFakeRandomUUID', () => {
  return {
    randomUUID: faker.string.uuid()
  };
});
Cypress.Commands.add('generateFakeRandomHexColor', () => {
  return {
    randomHexColor: faker.color.hex()
  };
});
Cypress.Commands.add('generateFakeRandomImage', () => {
  return {
    randomImage: faker.image.image()
  };
});
Cypress.Commands.add('generateFakeRandomText', () => {
  return {
    randomText: faker.lorem.sentence()
  };
});
Cypress.Commands.add('generateFakeRandomPhoneNumber', () => {
  return {
    randomPhoneNumber: faker.phone.number()
  };
});
Cypress.Commands.add('generateFakeRandomAddress', () => {
  return {
    randomAddress: faker.location.streetAddress()
  };
});
Cypress.Commands.add('generateFakeRandomCompany', () => {
  return {
    randomCompany: faker.company.name()
  };
});
Cypress.Commands.add('generateFakeRandomProduct', () => {
  return {
    randomProduct: faker.commerce.productName()
  };
});
Cypress.Commands.add('generateFakeRandomJob', () => {
  return {
    randomJob: faker.person.jobTitle()
  };
});
Cypress.Commands.add('generateFakeRandomFinance', () => {
  return {
    randomFinance: faker.finance.amount()
  };
});
Cypress.Commands.add('generateFakeRandomVehicle', () => {
  return {
    randomVehicle: faker.vehicle.vehicle()
  };
});
Cypress.Commands.add('generateFakeRandomFood', () => {
  return {
    randomFood: faker.food.food()
  };
});
Cypress.Commands.add('generateFakeRandomColor', () => {
  return {
    randomColor: faker.color.human()
  };
});
Cypress.Commands.add('generateFakeRandomMusic', () => {
  return {
    randomMusic: faker.music.genre()
  };
});
Cypress.Commands.add('generateFakeRandomWebsite', () => {
  return {
    randomWebsite: faker.internet.domainName()
  };
});
Cypress.Commands.add('generateFakeRandomTextFormat', () => {
  return {
    randomTextFormat: faker.lorem.text()
  };
});
Cypress.Commands.add('generateFakeRandomRandom', () => {
  return {
    randomRandom: faker.number.int()
  };
});
Cypress.Commands.add('generateFakeRandomImageData', () => {
  return {
    randomImageData: faker.image.image()
  };
});
Cypress.Commands.add('generateFakeRandomLocation', () => {
  return {
    randomLocation: faker.location.latitude()
  };
});
Cypress.Commands.add('generateFakeRandomInternet', () => {
  return {
    randomInternet: faker.internet.email()
  };
});
Cypress.Commands.add('generateFakeRandomNumber', () => {
  return {
    randomNumber: faker.number.int({ min: 0, max: 100 })
  };
});
Cypress.Commands.add('generateFakeRandomString', () => {
  return {
    randomString: faker.string.alphanumeric(10)
  };
});
Cypress.Commands.add('generateFakeRandomBoolean', () => {
  return {
    randomBoolean: faker.datatype.boolean()
  };
});
Cypress.Commands.add('generateFakeRandomDate', () => {
  return {
    randomDate: faker.date.past()
  };
});
Cypress.Commands.add('generateFakeRandomArray', () => {
  return {
    randomArray: faker.helpers.arrayElements(['apple', 'banana', 'cherry'], 2)
  };
});
// Cypress.Commands.add('login', (username, password) => {
//   cy.get('[data-test="username"]').type(username);
//   cy.get('[data-test="password"]').type(password);
//   cy.get('[data-test="login-button"]').click();
// });

Cypress.Commands.add('login', (username, password) => {
  cy.session({username}, () => {
  cy.visit('/');
  cy.get('[data-test="username"]').type(username);
  cy.get('[data-test="password"]').type(password);
  cy.get('[data-test="login-button"]').click();
  cy.url().should('include', '/inventory.html');
});
});
Cypress.Commands.add("restoreSession", () => {
  cy.session("login-session", () => {
    cy.login();
  });
})
Cypress.Commands.add('preserveOnce', (...keys) => {
  Cypress.on('window:before:load', (win) => {
    keys.forEach(key => {
      if (win.localStorage.getItem(key)) {
        win.localStorage.setItem(key, localStorage.getItem(key));
      }
      if (win.sessionStorage.getItem(key)) {
        win.sessionStorage.setItem(key, sessionStorage.getItem(key));
      }
    });
  });
});
Cypress.Commands.add('verifyLoggedIn', () => {
  cy.get('.app_logo').should('be.visible');
  cy.get('.inventory_container').should('be.visible');
  cy.get('[data-test="username"]').should('not.exist');
});

/**
 * Custom command to get the cart count
 */
Cypress.Commands.add('getCartCount', () => {
  cy.get('.shopping_cart_badge').then(($badge) => {
    if ($badge.length) {
      return cy.wrap(parseInt($badge.text()));
    } else {
      return cy.wrap(0);
    }
  });
});

/**
 * Custom command to preserve sessionStorage and localStorage values
 * This is a workaround for state management if cy.session() isn't fully maintaining state
 */
Cypress.Commands.add('preserveStateOnce', (...keys) => {
  let localStorage = {};
  let sessionStorage = {};
  
  // Save storage before reload
  cy.window().then((win) => {
    keys.forEach(key => {
      if (win.localStorage.getItem(key)) {
        localStorage[key] = win.localStorage.getItem(key);
      }
      if (win.sessionStorage.getItem(key)) {
        sessionStorage[key] = win.sessionStorage.getItem(key);
      }
    });
  });
  
  // Restore storage after reload
  cy.window().then((win) => {
    Object.keys(localStorage).forEach(key => {
      win.localStorage.setItem(key, localStorage[key]);
    });
    Object.keys(sessionStorage).forEach(key => {
      win.sessionStorage.setItem(key, sessionStorage[key]);
    });
  });
});
