import {useState} from 'react'

const Button = (props) => {
return(<button onClick={props.onClick}>{props.text}</button>)
}
const Display = (props) => <p>{props.optionName} {props.optionValue}</p>
const Average = (props) => <p>average {(props.averageGood + props.averageNeutral + props.averageBad)/props.all }</p>


const App = () => {
  //save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = ()=> setGood(currentGood => currentGood + 1)
  const handleNeutralClick = () => setNeutral(currentNeutral => currentNeutral + 1)
  const handleBadClick = () => setBad(currentBad => currentBad + 1)
  const allFeedback = () => good + neutral + bad
  const positive = () => good / allFeedback() * 100 + "%"

  return (
    <div>
      <h1>give feedback</h1>

      <Button onClick={handleGoodClick} text="good"/>

      <Button onClick={handleNeutralClick} text="neutral" />

      <Button onClick={handleBadClick} text ="bad" />


      <h2>statistics</h2>
      <Display optionName="good" optionValue={good} />
      <Display optionName="neutral" optionValue={neutral} />
      <Display optionName="bad" optionValue={bad}/>

      <p>all {allFeedback()}</p>
      <Average averageGood={good*1} averageNeutral={neutral*0} averageBad={bad*(-1)} all={allFeedback()} />
      <p>positive {positive()}</p>

    </div>
  )
}

export default App