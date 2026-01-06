import {useState} from 'react'

const Button = (props) => {
return(<button onClick={props.onClick}>{props.text}</button>)
}

const Statistics = (props) => {
  const all = props.good + props.neutral + props.bad
  const average = (props.good - props.bad) / all
  const positive = props.good / all * 100 + '%'
  
  if (all === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <p>good {props.good}</p>
      <p>neutral {props.neutral}</p>
      <p>bad {props.bad}</p>
      <p>all {all}</p>
      <p>average {average}</p>
      <p>positive {positive}</p>
    </div>
  )
}

const App = () => {
  //save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = ()=> setGood(currentGood => currentGood + 1)
  const handleNeutralClick = () => setNeutral(currentNeutral => currentNeutral + 1)
  const handleBadClick = () => setBad(currentBad => currentBad + 1)
  

  return (
    <div>
      <h1>give feedback</h1>

      <Button onClick={handleGoodClick} text="good"/>
      <Button onClick={handleNeutralClick} text="neutral" />
      <Button onClick={handleBadClick} text ="bad" />

      <h2>statistics</h2>
      
      <Statistics good={good} neutral={neutral} bad={bad} />

    </div>
  )
}

export default App