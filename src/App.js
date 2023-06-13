import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

 
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const loggedinUser = await loginService.login({ username, password });
      setUser(loggedinUser);
      setToken(loggedinUser.token);
      console.log(token);
      setUsername('');
      setPassword('');

    } catch (error) {
      console.log(error);
    }

  }

  

  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username.value}
            name="Email"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password.value}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
)

const blogsList = () => (
  <div>
  <h2>blogs</h2>
  <p>{user.name} logged in</p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
  </div>
)

  return (
    <div>
      {!user && loginForm()}
      {user && blogsList()}
    </div>
  )
}

export default App