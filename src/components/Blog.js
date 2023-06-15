import { useState } from 'react'

const Blog = ({ blog, currentUser, handleLike, handleRemove }) => {
  const [showDetails, setShowDetails] = useState(false)
  // const [likes, setLikes] = useState(blog.likes)

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


  return(
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={toggleShowDetails}>{showDetails ? 'hide' : 'view'}</button>
      {showDetails && (
        <div>

          <p className='blogUrl'>{blog.url}</p>
          <p className='blogLikes'>likes {blog.likes} <button onClick={() => handleLike(blog)}>like</button></p>
          {blog.user ?<p>{blog.user.name}</p>: <></>}
          {blog.user && currentUser.id === blog.user.id ? <p><button style={removeButtonStyle} onClick={() => handleRemove(blog)}>remove</button></p> : <></>}
        </div>
      )}
    </div>
  )
}

export default Blog