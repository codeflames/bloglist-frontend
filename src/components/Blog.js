import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, currentUser }) => {
  const [showDetails, setShowDetails] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const removeButtonStyle = {
    backgroundColor: 'blue',
    color: 'white',
    border: 'none',
    borderRadius: 5,
    padding: 5,
  }



  const toggleShowDetails = () => {
    setShowDetails(!showDetails)
  }

  const handleLike = async() => {
    console.log('like')
    const updatedBlog = {
      ...blog,
      likes: likes + 1,
      user: blog.user.id
    }
    const returnedBlog = await blogService.update(blog.id, updatedBlog)
    console.log(returnedBlog)
    blog.likes = returnedBlog.likes
    setLikes(returnedBlog.likes)
  }

  const handleRemove = async() => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      await blogService.deleteBlog(blog.id)
      window.location.reload()
    }
  }


  return(
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={toggleShowDetails}>{showDetails ? 'hide' : 'view'}</button>
      {showDetails && (
        <div>

          <p>{blog.url}</p>
          <p>likes {likes} <button onClick={handleLike}>like</button></p>
          {blog.user ?<p>{blog.user.name}</p>: <></>}
          {blog.user && currentUser.id === blog.user.id ? <p><button style={removeButtonStyle} onClick={handleRemove}>remove</button></p> : <></>}
        </div>
      )}
    </div>
  )
}

export default Blog