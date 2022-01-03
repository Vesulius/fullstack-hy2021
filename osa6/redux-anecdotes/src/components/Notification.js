
import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  const visible = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const disabled = {
    display: null
  }

  const style = notification ? visible : disabled

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification