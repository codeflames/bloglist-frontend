import { useState } from 'react'

const BlogForm = ({ createBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          Title <input type="text" placeholder='Blog Title' value={title} name="Title" onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          Author <input type="text" placeholder='Blog Author' value={author} name="Author" onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          Url <input type="text" placeholder='Blog URL' value={url} name="Url" onChange={(e) => setUrl(e.target.value)} />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default BlogForm