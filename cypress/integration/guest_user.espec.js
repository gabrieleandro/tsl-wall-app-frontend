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

  it('Can sign up and sign in', function() {
    cy.visit('signup')
    cy.server()
    cy.route('POST', '/api/users/').as('postSignup')

    cy.get(FIRST_NAME_FIELD).type(USER_FIRST_NAME)
    cy.get(LAST_NAME_FIELD).type(USER_LAST_NAME)
    cy.get(USERNAME_FIELD).type(USER_USERNAME)
    cy.get(EMAIL_FIELD).type(USER_EMAIL)
    cy.get(PASSWORD_FIELD).type(USER_PASSWORD)
    cy.get(CONFIRM_PASSWORD_FIELD).type(USER_PASSWORD)

    cy.get('button[type=submit]').click()
    cy.wait('@postSignup')

    cy.contains('Account was created successfully! Now you can sign in and start posting.')

    cy.location('pathname')
      .should('equal', '/signin')

    cy.route('POST', '/api/token/').as('postSignin')

    cy.get(USERNAME_FIELD).type(USER_USERNAME)
    cy.get(PASSWORD_FIELD).type(USER_PASSWORD)
    cy.contains('button', 'Sign In').click()

    cy.wait('@postSignin')

    cy.location('pathname')
      .should('equal', '/')

    cy.get('textarea[name=body]')
      .should('have.attr', 'placeholder', "What's on your mind?")

    cy.getCookie(COOKIE_NAME)
      .should('exist')
  })

  it('Does not sign up with Email or username if already exist', () => {
    cy.visit('signup')
    cy.server()
    cy.route('POST', '/api/users/').as('postSignup')

    cy.get(FIRST_NAME_FIELD).type(USER_FIRST_NAME)
    cy.get(LAST_NAME_FIELD).type(USER_LAST_NAME)
    cy.get(USERNAME_FIELD).type(USER_USERNAME)
    cy.get(EMAIL_FIELD).type(USER_EMAIL)
    cy.get(PASSWORD_FIELD).type(USER_PASSWORD)
    cy.get(CONFIRM_PASSWORD_FIELD).type(USER_PASSWORD)

    cy.get('button[type=submit]').click()
    cy.wait('@postSignup')

    cy.contains('A user with that username already exists.')
    cy.contains('A user with that email already exists.')
  })

  it('Trying to access profile redirects to /', function() {
    cy.visit('me')
    cy.location('pathname')
      .should('equal', '/')
  })
})