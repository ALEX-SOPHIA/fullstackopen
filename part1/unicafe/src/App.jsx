import {useState} from 'react'

const Button = (props) => <button onClick={props.onClick}>{props.text}</button>
const StatisticLine = (props) => <p>{props.text} {props.value}</p>
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
      <StatisticLine text="good" value={props.good} />
      <StatisticLine text="neutral" value={props.neutral} />
      <StatisticLine text="bad" value={props.bad} />
      <StatisticLine text="all" value={all} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={positive} />
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