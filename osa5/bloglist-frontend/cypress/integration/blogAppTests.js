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

    describe('blogs can be manipulated', function() {
      beforeEach(function() {
        const blog = {
          title: 'title1',
          author: 'author1',
          url: 'url1'
        }
        cy.postBlog(blog)
        cy.visit('http://localhost:3000')
        cy.reload()
      })

      it('liking blog increses likes', function() {
        cy.get('#toggle').click()
        cy.get('#likes').should('contain', '0')
        cy.get('#like').click()
        cy.get('#likes').should('contain', '1')
      })

      it('blog poster can delete it', function() {
        cy.get('#toggle').click()
        cy.get('#remove').click()
        cy.contains('Blog title1 removed')
      })

      it('blogs are in the order of likes', function() {
        const blogs = [
          {
            title: 'title2',
            author: 'author2',
            url: 'url2',
            likes: 1
          },
          {
            title: 'title3',
            author: 'author3',
            url: 'url3',
            likes: 2
          },
        ]
        cy.postBlog(blogs[0])
        cy.postBlog(blogs[1])
        cy.visit('http://localhost:3000')
        cy.reload()

        cy.get('#blog-list')
          .children()
          .then(blogs => {
            cy.get(blogs[0]).contains('title3')
            cy.get(blogs[1]).contains('title2')
            cy.get(blogs[2]).contains('title1')
          })

        cy.contains('title1').find('#toggle').click()
        cy.get('#like').click()
        cy.get('#likes', { timeout: 1000 }).contains(1)
        cy.get('#like').click()
        cy.get('#likes', { timeout: 1000 }).contains(2)
        cy.get('#like').click()
        cy.get('#likes', { timeout: 1000 }).contains(3)

        cy.get('#blog-list').children(':first').contains('title1')

        cy.get('#blog-list')
          .children()
          .then(blogs => {
            cy.get(blogs[0]).contains('title1')
            cy.get(blogs[1]).contains('title3')
            cy.get(blogs[2]).contains('title2')
          })
      })
    })
  })
})