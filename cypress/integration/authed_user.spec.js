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
const BODY_MESSAGE_CONTENT = 'Minha postagem.'


describe('Create User Tester', function(){
  it('Successfully create user', () => {
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
  })
})

describe('Test authed user', function() {
  beforeEach(function () {
    cy.visit('/signin')
  })
  
  it('Successfully signs in', () => {
    cy.server()
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

  it('Does not sign in with invalid credentials', () => {
    cy.get(USERNAME_FIELD).type(USER_USERNAME)
    cy.get(PASSWORD_FIELD).type('wrong.password')
    cy.contains('button', 'Sign In').click()

    cy.contains('No active account found with the given credentials')
  })

  it('Can access profile', () => {
    cy.server()
    cy.route('POST', '/api/token/').as('postSignin')

    cy.get(USERNAME_FIELD).type(USER_USERNAME)
    cy.get(PASSWORD_FIELD).type(USER_PASSWORD)
    cy.contains('button', 'Sign In').click()

    cy.wait('@postSignin')

    cy.contains('Profile').click()
    cy.url().should('include', 'me')
    cy.contains(USER_EMAIL)
      .should('exist')
  })

  it('Can post', function() {
    cy.server()
    cy.route('POST', '/api/token/').as('postSignin')

    cy.get(USERNAME_FIELD).type(USER_USERNAME)
    cy.get(PASSWORD_FIELD).type(USER_PASSWORD)
    cy.contains('button', 'Sign In').click()

    cy.wait('@postSignin')

    cy.route('POST', '/api/posts/').as('postSubmitPost')
    cy.get(BODY_MESSAGE_FIELD).type(BODY_MESSAGE_CONTENT)
    .get('[type=submit]').click()

    cy.wait('@postSubmitPost')
    cy.contains('Post sent.')
    cy.get('p').should('contain', BODY_MESSAGE_CONTENT)
  })

  it('Does not post with empty body', function() {
    cy.server()
    cy.route('POST', '/api/token/').as('postSignin')

    cy.get(USERNAME_FIELD).type(USER_USERNAME)
    cy.get(PASSWORD_FIELD).type(USER_PASSWORD)
    cy.contains('button', 'Sign In').click()

    cy.wait('@postSignin')

    cy.get('[type=submit]').click()
    cy.get('p').should('contain', 'Please, write a message.')
  })

  it('Can sign out', function() {
    cy.server()
    cy.route('POST', '/api/token/').as('postSignin')

    cy.get(USERNAME_FIELD).type(USER_USERNAME)
    cy.get(PASSWORD_FIELD).type(USER_PASSWORD)
    cy.contains('button', 'Sign In').click()

    cy.wait('@postSignin')

    cy.get('header').contains('Sign out').click()
    cy.contains('You have been logged out successfully.')
      .should('exist')
    cy.getCookie(COOKIE_NAME)
      .should('be.null')
  })
})