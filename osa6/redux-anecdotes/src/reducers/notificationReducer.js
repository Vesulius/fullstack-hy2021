const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      if (state !== null) {
        clearTimeout(state[1])
      }
      return [action.content, action.timeoutCode]
    case 'DISABLE_NOTIFICATION':
      return null
    default:
      return state
  }
}

export const setNotification = (content, time) => {
  return dispatch => {
    const timeoutCode = setTimeout(() => dispatch(disableNotification()), time * 1000)
    dispatch({
      type: 'SET_NOTIFICATION',
      content,
      timeoutCode
    })
  }
}

export const disableNotification = () => {
  return {
    type: 'DISABLE_NOTIFICATION'
  }
}

export default notificationReducer
