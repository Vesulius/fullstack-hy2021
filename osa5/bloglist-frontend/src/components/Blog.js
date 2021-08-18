import React, { useState } from 'react'

const Blog = blog => {
  const [hide, setHide] = useState(true)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleHide = () => {
    setHide(!hide)
  }

  const buttonLabel = hide ? 'show' : 'hide'

  const info = () => {
    return (
      <div>
        {blog.url}<br></br>
        {blog.likes}
        <button>like</button><br></br>
        {blog.user}
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