import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setChange }) => {
  const [hide, setHide] = useState(true)
  const [likes, setLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = async () => {
    try {
      await blogService.like(blog)
      blog.likes = blog.likes + 1
      setLikes(likes + 1)
      setChange(true)
    } catch(exeption) {
      console.log(exeption)
    }
  }

  const handleRemove = async () => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) return
    try {
      await blogService.remove(blog.id)
      blog.id = null
      setChange(true)
    } catch(exeption) {
      console.log(exeption)
    }
  }

  const toggleHide = () => {
    setHide(!hide)
  }

  const buttonLabel = hide ? 'show' : 'hide'

  const info = () => {
    return (
      <div>
        {blog.url}<br></br>
        {likes}
        <button onClick={handleLike}>like</button><br></br>
        {blog.user.name}
        <button onClick={handleRemove}>remove</button>
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleHide}>{buttonLabel}</button>
      {!hide && info()}
    </div>

  )
}

export default Blog