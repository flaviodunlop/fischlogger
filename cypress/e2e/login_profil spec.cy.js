describe('template spec', () => {
  /* ==== Test Created with Cypress Studio ==== */
  it('login_user_Test', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('https://fischlogger.vercel.app');
    cy.wait(500);
    cy.get('.welcome_img').click();
    cy.wait(500);
    cy.get('.header_profile').click();
    cy.wait(500);
    cy.get('[type="email"]').clear('f');
    cy.get('[type="email"]').type(Cypress.env("testuser").email);
    cy.get('[type="password"]').clear('f');
    cy.get('[type="password"]').type(Cypress.env("testuser").password);
    cy.get('.button').click();
    cy.wait(500);
    cy.contains('Dein Account').should('be.visible');
    cy.get('.form-widget').click();
    cy.wait(500);
    cy.get('#username').clear();
    cy.get('#username').type('neuer Name');
    cy.get(':nth-child(5) > .button').click();
    cy.wait(500);
    cy.get("input[id=username]").should('have.value', 'neuer Name')
    cy.get(':nth-child(6) > .button').click();
    /* ==== End Cypress Studio ==== */
  });
})