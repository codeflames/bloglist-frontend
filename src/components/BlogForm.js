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
          Title <input id='title' type="text" placeholder='Blog Title' value={title} name="Title" onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          Author <input id='author' type="text" placeholder='Blog Author' value={author} name="Author" onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          Url <input id='url' type="text" placeholder='Blog URL' value={url} name="Url" onChange={(e) => setUrl(e.target.value)} />
        </div>
        <button id='create-blog' type="submit">Create</button>
      </form>
    </div>
  )
}

export default BlogForm