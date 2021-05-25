import React, { useState } from 'react'
const App = (props) => {
  const [goodCount, setGoodCounter] = useState(0)
  const [neutralCount, setNeutralCounter] = useState(0)
  const [badCount, setBadCounter] = useState(0)

  return (
    <div>
      <div>
        <h1>give feedback</h1>
      </div>
      <Button text="good" handleClick={() => setGoodCounter(goodCount + 1)} />
      <Button text="neutral" handleClick={() => setNeutralCounter(neutralCount + 1)} />
      <Button text="bad" handleClick={() => setBadCounter(badCount + 1)} />

      <Statistics goodCount={goodCount} neutralCount={neutralCount} badCount={badCount} />
    </div>

  )
}

const Statistics = ({ goodCount, neutralCount, badCount }) => {
  const sum = goodCount + neutralCount + badCount
  if (sum === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <div>
        <h1>statistics</h1>
      </div>
      <StatisticLine text="good" value={goodCount} />
      <StatisticLine text="neutral" value={neutralCount} />
      <StatisticLine text="bad" value={badCount} />
      <StatisticLine text="all" value={sum} />
      <StatisticLine text="average" value={(goodCount - badCount) / (sum)} />
      <StatisticLine text="positive" value={goodCount / (sum) + " %"} />
    </div>
  )
}

const StatisticLine = ({ text, value }) => (
  <div>
    <p> {text} {value} </p>
  </div>
)

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

export default App