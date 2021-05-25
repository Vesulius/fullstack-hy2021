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
  if (goodCount === 0 && neutralCount === 0 && badCount === 0) {
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
      <Display value={"good"} counter={goodCount} />
      <Display value={"neutral"} counter={neutralCount} />
      <Display value={"bad"} counter={badCount} />
      <Display value={"all"} counter={goodCount + neutralCount + badCount} />
      <Display value={"average"} counter={(goodCount - badCount) / (goodCount + neutralCount + badCount)} />
      <Display value={"positive"} counter={goodCount / (goodCount + neutralCount + badCount) + " %"} />
    </div>
  )
}

const Display = ({ value, counter }) => (
  <div>
    <p> {value} {counter} </p>
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