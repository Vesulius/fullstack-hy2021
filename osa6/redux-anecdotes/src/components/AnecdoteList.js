import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { setNotification, disableNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        const filtered = state.anecdotes.filter(a => a.content.includes(state.filter))
        return filtered.sort((a1, a2) => a1.votes-a2.votes).reverse()
    })
    const dispatch = useDispatch()

    const vote = (anecdote) => {
      console.log('vote', anecdote.id)
      dispatch(voteAnecdote(anecdote.id))
      dispatch(setNotification(`You voted for \'${anecdote.content}\'`))
      setTimeout(() => {
          dispatch(disableNotification())
      }, 5000)
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList