import { createStore } from 'redux'
import reducer from './reducers/anecdoteReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const Store = () => {
    return (
        createStore(
            reducer,
            composeWithDevTools()
        )
    )
}

export default Store