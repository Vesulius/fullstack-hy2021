describe('Blog app', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', {
      username: 'tester',
      password: 'password1'
    })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('Log in to application')
      cy.get('#username').type('tester')
      cy.get('#password').type('password1')
      cy.get('#login-button').click()
      cy.contains('tester logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('Log in to application')
      cy.get('#username').type('test?')
      cy.get('#password').type('p4ssw0rd')
      cy.get('#login-button').click()
      cy.contains('password or username is incorrect')
      cy.get('.notification').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'tester',
        password: 'password1'
      }).then(response => {
        localStorage.setItem('loggedBloglistUser', JSON.stringify(response.body))
      })
      cy.visit('http://localhost:3000')
    })

    it('A blog can be created', function() {
      cy.get('#open').click()
      cy.get('#title').type('testers_guide_to_testing')
      cy.get('#author').type('tester')
      cy.get('#url').type('itssabook')
      cy.get('#submit').click()
      cy.contains('New blog created')
      cy.contains('testers_guide_to_testing')
    })
  })
})