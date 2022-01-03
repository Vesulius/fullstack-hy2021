const notificationReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.data
        default:
            return state
    }
}

export const setNotification = (content) => {
    return {
        type: 'SET_NOTIFICATION',
        data: content
    }
} 

export default notificationReducer