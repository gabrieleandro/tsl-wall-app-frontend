describe('Test authed user', function() {
  const cookieName = Cypress.env('REACT_APP_COOKIE_NAME')

  beforeEach(function () {
    cy.visit('/signin')
  })
  
  it('Successfully signs in', () => {
    cy.server()
    cy.route('POST', '/api/token/').as('postSignin')

    cy.get('[name=username]').type('cypress.tester')
    cy.get('[name=password]').type('tester.123')
    cy.contains('button', 'Sign In').click()

    cy.wait('@postSignin')

    cy.location('pathname')
      .should('equal', '/')

    cy.get('textarea[name=body]')
      .should('have.attr', 'placeholder', "What's on your mind?")

    cy.getCookie(cookieName)
      .should('exist')
  })

  it('Does not sign in with invalid credentials', () => {
    cy.get('[name=username]')
    .type('cypress.tester')
    .should('have.value', 'cypress.tester')

    cy.get('[name=password]')
    .type('wrong.password')
    .should('have.value', 'wrong.password')

    cy.contains('button', 'Sign In').click()
    cy.contains('No active account found with the given credentials')
  })

  it('Can access profile', () => {
    cy.server()
    cy.route('POST', '/api/token/').as('postSignin')

    cy.get('[name=username]').type('cypress.tester')
    cy.get('[name=password]').type('tester.123')
    cy.contains('button', 'Sign In').click()

    cy.wait('@postSignin')

    cy.contains('Profile').click()
    cy.url().should('include', 'me')
    cy.contains('cytester@tester.com')
      .should('exist')
  })

  it('Can post', function() {
    cy.server()
    cy.route('POST', '/api/token/').as('postSignin')

    cy.get('[name=username]').type('cypress.tester')
    cy.get('[name=password]').type('tester.123')
    cy.contains('button', 'Sign In').click()

    cy.wait('@postSignin')

    cy.route('POST', '/api/posts/').as('postSubmitPost')
    cy.get('[name=body]').type('Minha postagem.')
    .get('[type=submit]').click()

    cy.wait('@postSubmitPost')
    cy.contains('Post sent.')
    cy.get('p').should('contain', 'Minha postagem.')
  })

  it('Does not post with empty body', function() {
    cy.server()
    cy.route('POST', '/api/token/').as('postSignin')

    cy.get('[name=username]').type('cypress.tester')
    cy.get('[name=password]').type('tester.123')
    cy.contains('button', 'Sign In').click()

    cy.wait('@postSignin')

    cy.get('[type=submit]').click()
    cy.get('p').should('contain', 'Please, write a message.')
  })

  it('Can sign out', function() {
    cy.server()
    cy.route('POST', '/api/token/').as('postSignin')

    cy.get('[name=username]').type('cypress.tester')
    cy.get('[name=password]').type('tester.123')
    cy.contains('button', 'Sign In').click()

    cy.wait('@postSignin')

    cy.get('header').contains('Sign out').click()
    cy.contains('You have been logged out successfully.')
      .should('exist')
    cy.getCookie(cookieName)
      .should('be.null')
  })
})