import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes.sort((a1, a2) => a1.votes-a2.votes).reverse())
    const dispatch = useDispatch()

    const vote = (id) => {
      console.log('vote', id)
      dispatch(voteAnecdote(id))
    }

    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList