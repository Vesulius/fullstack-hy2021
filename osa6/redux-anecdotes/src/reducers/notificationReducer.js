const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.content
    case 'DISABLE_NOTIFICATION':
      return null
    default:
      return state
  }
}

export const setNotification = (content) => {
  return {
    type: 'SET_NOTIFICATION',
    content
  }
}

export const disableNotification = () => {
  return {
    type: 'DISABLE_NOTIFICATION'
  }
}

export default notificationReducer
