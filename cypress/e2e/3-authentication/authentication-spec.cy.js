// @ts-nocheck
/// <reference types="Cypress"/>

describe('Test authentication functionality', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should check that login works as expected', () => {
    cy.validLogin()
      .wait(500)
      .then(() => {
        // Check if token is stored
        expect(localStorage.getItem('token')).to.exist;
      });
  });

  it('should log out the user', () => {
    cy.validLogin()
      .wait(500)
      .then(() => {
        cy.logout()
          .wait(500)
          .then(() => {
            // Check if token is removed
            expect(localStorage.getItem('token')).to.not.exist;
          });
      });
  });

  it('Should check that login fails with wrong credentials, and gives an error message', () => {
    const noroffAlert = cy.stub().as('noroffAlert');
    cy.on('window:alert', noroffAlert);
    cy.invalidLogin();

    cy.get('@noroffAlert').should(
      'have.been.calledOnceWith',
      'Either your username was not found or your password is incorrect',
    );
    cy.get('@noroffAlert').should('have.been.calledOnce');
  });
});
