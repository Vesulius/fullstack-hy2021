import React, { useState } from 'react'
import blogService from '../services/blogs'
import propTypes from 'prop-types'

const Blog = ({ blog, setChange, handleLike }) => {
  const [hide, setHide] = useState(true)
  const [likes, setLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
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
        <div id='likes'>
          likes {likes}
          <button id='like' onClick={() => handleLike({ blog, likes, setLikes })}>like</button>
        </div>
        {blog.user.name}
        <button id='remove' onClick={handleRemove}>remove</button>
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button id='toggle' onClick={toggleHide}>{buttonLabel}</button>
      {!hide && info()}
    </div>
  )
}

Blog.propTypes = {
  blog: propTypes.object.isRequired,
  setChange: propTypes.func.isRequired
}

export default Blog