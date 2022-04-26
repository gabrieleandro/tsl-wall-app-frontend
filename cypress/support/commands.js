const USERNAME_FIELD = '[name=username]'
const PASSWORD_FIELD = '[name=password]'

Cypress.Commands.add('login', (username, password) => {
    cy.visit('signin')
    cy.server()
    cy.route('POST', '/api/token/').as('postSignin')

    cy.get(USERNAME_FIELD).type(username)
    cy.get(PASSWORD_FIELD).type(password)
    cy.contains('button', 'Sign In').click()

    cy.wait('@postSignin')

    cy.location('pathname')
      .should('equal', '/')
})
