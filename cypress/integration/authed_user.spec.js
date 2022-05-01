const COOKIE_NAME = Cypress.env('REACT_APP_COOKIE_NAME')

const RANDOM_PREFIX = Math.floor(Math.random() * 100000)

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


describe('Register an User', function(){
  it('Successfully create an user', () => {
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

  it('Does not sign up with username already exist', () => {
    cy.visit('signup')
    cy.server()
    cy.route('POST', '/api/users/').as('postSignup')

    cy.get(FIRST_NAME_FIELD).type(USER_FIRST_NAME)
    cy.get(LAST_NAME_FIELD).type(USER_LAST_NAME)
    cy.get(USERNAME_FIELD).type(USER_USERNAME)
    cy.get(EMAIL_FIELD).type(`${USER_EMAIL}.br`)
    cy.get(PASSWORD_FIELD).type(USER_PASSWORD)
    cy.get(CONFIRM_PASSWORD_FIELD).type(USER_PASSWORD)

    cy.get('button[type=submit]').click()
    cy.wait('@postSignup')

    cy.contains('A user with that username already exists.')
  })

  it('Does not sign up with email already exist', () => {
    cy.visit('signup')
    cy.server()
    cy.route('POST', '/api/users/').as('postSignup')

    cy.get(FIRST_NAME_FIELD).type(USER_FIRST_NAME)
    cy.get(LAST_NAME_FIELD).type(USER_LAST_NAME)
    cy.get(USERNAME_FIELD).type(`${USER_USERNAME}2`)
    cy.get(EMAIL_FIELD).type(USER_EMAIL)
    cy.get(PASSWORD_FIELD).type(USER_PASSWORD)
    cy.get(CONFIRM_PASSWORD_FIELD).type(USER_PASSWORD)

    cy.get('button[type=submit]').click()
    cy.wait('@postSignup')

    cy.contains('A user with that email already exists.')
  })
})

describe('Test authed user', function() {
  beforeEach(function () {
    cy.login(USER_USERNAME, USER_PASSWORD)
    cy.visit('/')
  })
  
  it('Successfully signs in', () => {
    cy.get('textarea[name=body]')
      .should('have.attr', 'placeholder', "What's on your mind?")

    cy.getCookie(COOKIE_NAME)
      .should('exist')
  })

  it('Can access profile', () => {
    cy.contains('Profile').click()
    cy.url().should('include', 'me')
    cy.contains(USER_EMAIL)
      .should('exist')
  })

  it('Can post', function() {
    cy.route('POST', '/api/posts/').as('postSubmitPost')
    cy.get(BODY_MESSAGE_FIELD).type(BODY_MESSAGE_CONTENT)
    .get('[type=submit]').click()

    cy.wait('@postSubmitPost')
    cy.contains('Post sent.')
    cy.get('p').should('contain', BODY_MESSAGE_CONTENT)
  })

  it('Can delete a post', function() {
    cy.get('[aria-label=remove]').first().click()
    cy.contains('Post removed successfully.')
    cy.contains(BODY_MESSAGE_CONTENT)
      .should('not.exist')
  })

  it('Does not post with empty body', function() {
    cy.get('[type=submit]').click()
    cy.get('p').should('contain', 'Please, write a message.')
  })

  it('Can sign out', function() {
    cy.get('header').contains('Sign out').click()
    cy.contains('You have been logged out successfully.')
      .should('exist')
    cy.getCookie(COOKIE_NAME)
      .should('be.null')
  })
})