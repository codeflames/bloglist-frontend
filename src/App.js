import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState(null)
  const [showBlogForm, setShowBlogForm] = useState(false)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      blogService.setToken(user.token)

    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const loggedinUser = await loginService.login({ username, password })
      setUser(loggedinUser)
      window.localStorage.setItem('loggedInUser', JSON.stringify(loggedinUser))
      blogService.setToken(loggedinUser.token)
      setUsername('')
      setPassword('')

    } catch (error) {
      showNotification({ message: error.response.data.error, type: 'error' })
      console.log(error)
    }

  }

  const handleLogout = () => {
    setUser(null)
    blogService.setToken(null)
    window.localStorage.removeItem('loggedInUser')

  }

  const handleCreateBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.create(blogObject)
      console.log('new blog from server', newBlog)
      setBlogs(blogs.concat(newBlog))
      showNotification({ message: `a new blog ${newBlog.title} by ${newBlog.author} added`, type: 'success' })
    } catch (error) {
      console.log(error)
      showNotification({ message: error.response.data.error, type: 'error' })
    }
  }

  const showNotification = ({ message, type }) => {
    setNotificationMessage(message)
    setNotificationType(type)
    setTimeout(() => {
      setNotificationMessage(null)
      setNotificationType(null)
    }, 5000)
  }

  const handleRemove = async(blog) => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      await blogService.deleteBlog(blog.id)
      window.location.reload()
    }
  }

  const handleLike = async(blog) => {
    console.log(blog)
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user ? blog.user.id : null
    }
    const returnedBlog = await blogService.update(blog.id, updatedBlog)
    console.log(returnedBlog)
    blog.likes = returnedBlog.likes
    setBlogs(blogs.map(b => b.id === blog.id ? blog : b))
  }




  const loginForm = () => (
    <LoginForm
      onSubmit={handleLogin}
      username={username}
      password={password}
      onChangeUsername={setUsername}
      onChangePassword={setPassword}
      notificationMessage={notificationMessage}
      notificationType={notificationType}
    />
  )


  const createBlogForm = () => {
    // showBlogForm styles
    const showWhenVisible = { display: showBlogForm ? '' : 'none' }
    const hideWhenVisible = { display: showBlogForm ? 'none' : '' }
    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setShowBlogForm(true)}>create new blog</button>
        </div>
        <div style={showWhenVisible}>

          <BlogForm createBlog={handleCreateBlog} />

          <button onClick={() => setShowBlogForm(false)}>cancel</button>
        </div>
      </div>)
  }

  const blogsList = () => (
    <div>
      <h2>blogs</h2>
      <Notification message={notificationMessage} type={notificationType} />
      <p>{user.name} logged in <button onClick={handleLogout}>Logout</button> </p>
      {createBlogForm()}
      {blogs.sort((a,b ) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} currentUser={user} handleLike={handleLike} handleRemove={handleRemove} />
      )}
    </div>
  )

  return (
    <div>

      {!user && loginForm()}
      {user && <div>


        {blogsList()}
      </div>
      }
    </div>
  )
}

export default App