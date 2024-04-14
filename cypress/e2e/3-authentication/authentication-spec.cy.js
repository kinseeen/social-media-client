// @ts-nocheck
/// <reference types="Cypress"/>

describe('Test authentication functionality', () => {
  cy.beforeEach(() => {
    cy.visit('/login');
  });

  it('should show a login form', () => {
    cy.get('form').should('exist');
    cy.get('input[name="email"]').should('exist');
    cy.get('input[name="password"]').should('exist');
  });
});
