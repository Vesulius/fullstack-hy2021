import { useSelector, useDispatch, connect } from 'react-redux'

import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = props => {
  // const anecdotes = useSelector(state => {
  //   const filtered = state.anecdotes.filter(a => a.content.includes(state.filter))
  //   return filtered.sort((a1, a2) => a2.votes - a1.votes)
  // })
  // const dispatch = useDispatch()

  const vote = anecdote => {
    props.voteAnecdote(anecdote)
    props.setNotification(`You voted for \'${anecdote.content}\'`, 3)
  }

  return (
    <div>
      {props.anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

const mapStateToProps = state => {
  const filtered = state.anecdotes
    .filter(a => a.content.includes(state.filter))
    .sort((a1, a2) => a2.votes - a1.votes)
  return {
    anecdotes: filtered
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  setNotification
}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdoteList
