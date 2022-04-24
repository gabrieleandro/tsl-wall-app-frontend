describe('Test sign in', function() {
  it('Authenticate an user and redirect to post page', function() {
    const cookieName = Cypress.env('REACT_APP_COOKIE_NAME')

    cy.visit('signin')

    cy.get('[name=username]')
    .type('cypress.tester')
    .should('have.value', 'cypress.tester')

    cy.get('[name=password]')
    .type('tester.123')
    .should('have.value', 'tester.123')

    cy.get('button[type=submit]').click()

    cy.wait(3000)

    cy.getCookie(cookieName)
      .should('exist')
      .then((c) => {
        // save cookie until we need it
        // cookie = c
      })

    cy.get('textarea[name=body]')
      .should('have.attr', 'placeholder', "What's on your mind?")

    cy.contains('Profile').click()
    cy.url().should('include', 'me')
    cy.contains('Joined in')
      .should('exist')
    cy.wait(1000)
  })

  it('Authed user can sign out', function() {
    const cookieName = Cypress.env('REACT_APP_COOKIE_NAME')
    cy.visit('')

    cy.get('header').contains('Sign out').click()

    cy.wait(1000)

    cy.contains('You have been logged out successfully.')
      .should('exist')

    cy.getCookie(cookieName)
      .should('not.exist')
  })
})