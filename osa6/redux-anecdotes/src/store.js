import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'

const Store = () => {
    const reducer = combineReducers({
        anecdotes: anecdoteReducer,
        notification: notificationReducer
    })

    return (
        createStore(
            reducer,
            composeWithDevTools()
        )
    )
}

export default Store