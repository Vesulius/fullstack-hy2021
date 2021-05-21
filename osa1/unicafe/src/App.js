import React, { useState } from 'react'
const App = (props) => {
  const [ goodCount, setGoodCounter ] = useState(0)
  const [ neutralCount, setNeutralCounter ] = useState(0)
  const [ badCount, setBadCounter ] = useState(0)

  const increaseGood = () => setGoodCounter(goodCount + 1)
  const increaseNeutral = () => setNeutralCounter(neutralCount + 1)
  const increaseBad = () => setBadCounter(badCount+ 1)

  return (
    <div>
      <div>
        <h1>give feedback</h1>
      </div>
      <Button text="good" handleClick={increaseGood}/>
      <Button text="neutral" handleClick={increaseNeutral}/>
      <Button text="bad" handleClick={increaseBad}/>
      <div>
        <h1>statistics</h1>
      </div>
      <Display value={"good"} counter={goodCount}/>
      <Display value={"neutral"} counter={neutralCount}/>
      <Display value={"bad"} counter={badCount}/>
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