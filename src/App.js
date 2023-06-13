import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser');
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON);
      setUser(user);
      blogService.setToken(user.token);

    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const loggedinUser = await loginService.login({ username, password });
      setUser(loggedinUser);
      window.localStorage.setItem('loggedInUser', JSON.stringify(loggedinUser));
      blogService.setToken(loggedinUser.token);
      setUsername('');
      setPassword('');

    } catch (error) {
      console.log(error);
      showNotification({message: error.response.data.error, type: 'error'});
    }

  }

  const handleLogout = () => {
    setUser(null);
    blogService.setToken(null);
    window.localStorage.removeItem('loggedInUser');

  }

  const handleCreateBlog = async (event) => {
    event.preventDefault();
    try {
      const newBlog = await blogService.create({ title, author, url });  
      setTitle('');
      setAuthor('');
      setUrl('');
      setBlogs(blogs.concat(newBlog));
      showNotification({message: `a new blog ${newBlog.title} by ${newBlog.author} added`, type: 'success'});
    } catch (error) {
      console.log(error);
      showNotification({message: error.response.data.error, type: 'error'});
    }
  }

  const showNotification = ({message, type}) => {
    setNotificationMessage(message);
    setNotificationType(type);
    setTimeout(() => {
      setNotificationMessage(null);
      setNotificationType(null);
    }, 5000);
  }



  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      {notificationMessage && Notification({message: notificationMessage, type: notificationType})}
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

  const createBlogForm = () => (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          title: <input type="text" value={title.value} name="Title" onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author: <input type="text" value={author.value} name="Author" onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          url: <input type="text" value={url.value} name="Url" onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )

  const blogsList = () => (
    <div>
      <h2>blogs</h2>
      <Notification message={notificationMessage} type={notificationType} />
      <p>{user.name} logged in <button onClick={handleLogout}>Logout</button> </p>
      {createBlogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
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