const COOKIE_NAME = Cypress.env('REACT_APP_COOKIE_NAME')

const RANDOM_PREFIX = Math.floor(Math.random() * 1000)

const FIRST_NAME_FIELD = '[name=first_name]'
const LAST_NAME_FIELD = '[name=last_name]'
const USERNAME_FIELD = '[name=username]'
const EMAIL_FIELD = '[name=email]'
const PASSWORD_FIELD = '[name=password]'
const CONFIRM_PASSWORD_FIELD = '[name=confirm_password]'

const USER_FIRST_NAME = `Cypress.${RANDOM_PREFIX}`
const USER_LAST_NAME = `Tester`
const USER_USERNAME = `cypress.tester.${RANDOM_PREFIX}`
const USER_PASSWORD = 'valid.password'
const USER_EMAIL = `cytester.${RANDOM_PREFIX}@tester.com`

const BODY_MESSAGE_FIELD = '[name=body]'


describe('Test guest user', function() {
  it('Can see post page', function() {
    cy.visit('/')
    cy.contains('Wall messages')
      .should('exist')
    cy.get(BODY_MESSAGE_FIELD)
      .should('not.exist')
  })

  it('Navigate to sign up page from header', function() {
    cy.get('header').contains('Sign up').click()
    cy.location('pathname')
      .should('equal', '/signup')
    cy.get('h1').should('contain', 'Sign up to start posting.')
  })

  it('Navigate to sign up page from sign in page', function() {
    cy.visit('signin')
    cy.get('a').contains("Don't have an account? Sign Up").click()
    cy.location('pathname')
      .should('equal', '/signup')
    cy.get('h1').should('contain', 'Sign up to start posting.')
  })

  it('Navigate to sign in page from header', function() {
    cy.get('header').contains('Sign in').click()
    cy.location('pathname')
      .should('equal', '/signin')
    cy.get('h1').should('contain', 'Sign in')
  })

  it('Navigate to sign in page from sign up page', function() {
    cy.visit('signup')
    cy.get('a').contains("Already have an account? Sign in").click()
    cy.location('pathname')
      .should('equal', '/signin')
    cy.get('h1').should('contain', 'Sign in')
  })

  it('Navigate to wall page from bottom navigation', function() {
    cy.visit('/')
    cy.get('a').contains("Wall").click()
    cy.location('pathname')
      .should('equal', '/')
    cy.contains('Wall messages')
      .should('exist')
  })

  it('Navigate to profile redirects to /', function() {
    cy.visit('me')
    cy.location('pathname')
      .should('equal', '/')
  })

  it('Does not sign in with invalid credentials', () => {
    cy.visit('signin')
    cy.get(USERNAME_FIELD).type(USER_USERNAME)
    cy.get(PASSWORD_FIELD).type('wrong.password')
    cy.contains('button', 'Sign In').click()

    cy.contains('No active account found with the given credentials')
  })
})