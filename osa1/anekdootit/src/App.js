import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const [selected, setSelected] = useState(Random)
  const [mostVotesIndex, setMostVotes] = useState(Random)
  const [points, setPoints] = useState(Array(6).fill(0))

  const HandleClick = () => {
    MostVotes()
    const copy = {
      ...points,
      points, [selected]: points[selected] + 1
    }
    setPoints(copy)
  }
  
  const MostVotes = () => { if (points[selected] + 1 > points[mostVotesIndex]) setMostVotes(selected) }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]} <br></br>
      has {points[selected]} votes <br></br>
      <button onClick={() => setSelected(Random)}>
        next anecdote
      </button>
      <button onClick={HandleClick}>
        vote
      </button>
      <h1>Anecdote with the most votes</h1>
      {anecdotes[mostVotesIndex]}
    </div>
  )
}

const Random = () => { return Math.floor(Math.random() * 6) }

export default App