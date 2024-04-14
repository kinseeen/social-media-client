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

/// <reference types="Cypress"/>

Cypress.Commands.add('login', (email, password) => {
  cy.intercept(
    'POST',
    'https://nf-api.onrender.com/api/v1/social/auth/login',
  ).as('loginNoroff');

  //Added ID "goToLogin" to the login button in the index.html file since it was several buttons with the same properties
  cy.get('#goToLogin').wait(500).click({ force: true });
  cy.get('#loginForm').then((form) => {
    cy.wrap(form).find('#loginEmail').type(email, { force: true });
    cy.wrap(form).find('#loginPassword').type(password, { force: true });
    cy.wrap(form).submit();
    cy.wait('@loginNoroff');
  });
});

Cypress.Commands.add('logout', () => {
  //Added ID "logout-button" to the logout button in the index.html file since it was several buttons with the same properties
  cy.get('#logout-button').click({ force: true });
});

Cypress.Commands.add('validLogin', () => {
  const email = Cypress.env('EMAIL');
  const password = Cypress.env('PASSWORD');
  cy.login(email, password);
});

Cypress.Commands.add('invalidLogin', () => {
  const email = 'invalid@email.com';
  const password = 'invalidpassword';
  cy.login(email, password);
});
