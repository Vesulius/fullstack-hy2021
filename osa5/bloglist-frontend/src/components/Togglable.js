import React, { useState } from 'react'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button id="open" onClick={toggleVisibility}>
          {props.showButtonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button id="close" onClick={toggleVisibility}>{props.hideButtonLabel}</button>
      </div>
    </div>
  )
}

export default Togglable