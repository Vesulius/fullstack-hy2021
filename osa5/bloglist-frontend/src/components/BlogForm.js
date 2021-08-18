import React, { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = (messager) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title,
      author,
      url
    }
    try {
      await blogService.postBlog(blogObject)
      messager.createMessage(true, 'New blog created')
    } catch(exeption) {
      console.log(exeption)
      messager.createMessage(false, 'Creating blog failed')
    }
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
            title:
          <input
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
            author:
          <input
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
            url:
          <input
            type="text"
            value={url}
            name="title"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}


export default BlogForm