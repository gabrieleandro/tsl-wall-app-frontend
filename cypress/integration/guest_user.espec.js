describe('Test filling sign in form', function() {
  it('Fill form with valid data', function() {
    cy.visit('/')
    cy.contains('Wall messages')
      .should('exist')
    cy.wait(1000)

    cy.visit('signin')
    cy.get('[name=username]')
    .should('exist')
    cy.wait(1000)

    cy.visit('me')
    cy.contains('Joined in')
      .should('not.exist')
  })

  it('Sign up an user and redirect to sign in page', function() {
    cy.visit('signup')

    cy.get('[name=first_name]')
      .type('Cypress')
      .should('have.value', 'Cypress')

    cy.get('[name=last_name]')
      .type('Tester')
      .should('have.value', 'Tester')

    cy.get('[name=username]')
      .type('cypress.tester')
      .should('have.value', 'cypress.tester')

    cy.get('[name=email]')
    .type('cytester@tester.com')
    .should('have.value', 'cytester@tester.com')

    cy.get('[name=password]')
      .type('tester.123')
      .should('have.value', 'tester.123')

    cy.get('[name=confirm_password]')
      .type('tester.123')
      .should('have.value', 'tester.123')

    cy.get('button[type=submit]').click()
  })
})