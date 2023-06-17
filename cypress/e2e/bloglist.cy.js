describe('Bloglist app', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Yereka Ueh-kabari',
      username: 'Codeflames',
      password: 'Testing@123'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('')
  })

  it('Login form is shown', () => {
    cy.contains('log in to application')
    cy.contains('Username')
    cy.contains('Password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.login({ username: 'Codeflames', password: 'Testing@123' })
      cy.contains('Yereka Ueh-kabari logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('Codeflames')
      cy.get('#password').type('Testing@1234')
      cy.get('#login-button').click()

      cy.get('.error').should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'Codeflames', password: 'Testing@123' })
    })

    it('A blog can be created', function() {
      cy.createBlog({
        title: 'A blog created by cypress',
        author: 'Yereka Ueh-kabari',
        url: 'https://www.example.com'
      })
      cy.contains('A blog created by cypress')
    })

    it('A blog can be liked', function () {
      cy.createBlog({
        title: 'A blog created by cypress',
        author: 'Yereka Ueh-kabari',
        url: 'https://www.example.com'
      })
      cy.contains('A blog created by cypress')

      cy.contains('view').click()
      cy.get('#like-button').click()
      cy.get('.blogLikes').contains('likes 1')
    })

    describe('When logged in and a blog created', function () {
      it('user can delete a blog', function () {
        cy.createBlog({
          title: 'A blog created by cypress',
          author: 'Yereka Ueh-kabari',
          url: 'https://www.example.com'
        })
        cy.contains('A blog created by cypress')

        cy.contains('view').click()
        cy.get('#delete-blog-button').click()
        cy.get('html').should('not.contain', 'A blog created by cypress')
      })

    })

    describe('When logged in and multiple blogs created', function () {
      it('only the user who created a blog can delete it', function () {
        cy.createBlog({
          title: 'A blog created by cypress',
          author: 'Yereka Ueh-kabari',
          url: 'https://www.example.com'
        })

        cy.contains('A blog created by cypress')
        cy.contains('view').click()
        cy.get('#delete-blog-button').contains('remove').should('be.visible')

        cy.contains('Logout').click()
        const user = {
          name: 'Yereka Ueh-kabari',
          username: 'Codeflames2',
          password: 'Testing@123'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('')
        cy.login({ username: 'Codeflames2', password: 'Testing@123' })
        cy.contains('A blog created by cypress')
        cy.get('html').should('not.contain', '#delete-blog-button')
      })
    })

  })
  describe('When logged in and multiple blogs created', function () {
    this.beforeEach(function () {
      cy.login({ username: 'Codeflames', password: 'Testing@123' })
      cy.createBlog({
        title: 'The title with the most likes',
        author: 'Yereka Ueh-kabari',
        url: 'https://www.example.com'
      })
      cy.createBlog({
        title: 'The title with the second most likes',
        author: 'Yereka Ueh-kabari',
        url: 'https://www.example.com'
      })
      // cy.createBlog({
      //   title: 'Yet another blog created by cypress',
      //   author: 'Yereka Ueh-kabari',
      //   url: 'https://www.example.com'
      // })
    })

    it('blogs are ordered according to likes with the blog with the most likes being first', function () {

      cy.get('.blog').eq(0).should('contain', 'The title with the most likes')
      cy.get('.blog').eq(1).should('contain', 'The title with the second most likes')


      for (let i = 0; i < 5; i++) {
        cy.get('.blog').eq(0).contains('view').click()
        cy.get('.blog').eq(0).contains('like').click()
        cy.wait(1000)
        cy.get('.blog').eq(0).contains('hide').click()
      }

      // cy.get('.blog').eq(0).should('contain', 'likes 5')

      for (let i = 0; i < 3; i++) {
        cy.get('.blog').eq(1).contains('view').click()
        cy.get('.blog').eq(1).contains('like').click()
        cy.wait(1000)
        cy.get('.blog').eq(1).contains('hide').click()
      }

      // click all the view buttons
      // cy.get('.blog').each(($el, index, $list) => {
      //   cy.wrap($el).contains('view').click()
      // })
      cy.get('.blog').eq(0).contains('view').click()
      cy.get('.blog').eq(1).contains('view').click()

      cy.get('.blogLikes').eq(0).contains('likes 5')
      cy.get('.blogLikes').eq(1).contains('likes 3')

      // check that the likes of the first blog is greater than the second blog
      // cy.get('.blogLikes').eq(0).contains('likes').then(($likes) => {
      //   const firstBlogLikes = Number($likes.text().split(' ')[1])
      //   cy.get('.blogLikes').eq(1).contains('likes').then(($likes) => {
      //     const secondBlogLikes = Number($likes.text().split(' ')[1])
      //     expect(firstBlogLikes).to.be.greaterThan(secondBlogLikes)
      //   })
      // })
    })



  })


})