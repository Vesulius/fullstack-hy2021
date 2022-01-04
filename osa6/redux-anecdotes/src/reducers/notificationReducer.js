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

export const setNotification = (content, time) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      content
    })
    await new Promise(resolve => setTimeout(resolve, time * 1000))
    dispatch(disableNotification())
  }
}

export const disableNotification = () => {
  return {
    type: 'DISABLE_NOTIFICATION'
  }
}

export default notificationReducer
