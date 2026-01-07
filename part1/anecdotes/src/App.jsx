import {useState} from 'react'

const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}

const Display = (props) => {

  return (
    <div>
      <h1>{props.headline}</h1>
      <p>{props.content}</p>
      <p>has {props.value} votes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  console.log(votes)

  const handleVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  const handleClick = () => {
    const selectRandom = Math.floor(Math.random() * anecdotes.length)
    console.log(anecdotes[selectRandom])
    setSelected(selectRandom)
  }

  const mostVoteIndex = votes.indexOf(Math.max(...votes))



  return (
    <div>
      <Display headline="Anecdote of the day" content={anecdotes[selected]} value={votes[selected]} />
      <Button onClick={handleVote} text="vote" />
      <Button onClick ={handleClick} text = "next  anecdote" />
      <Display headline="Anecdote with most votes" content={anecdotes[mostVoteIndex]} value={votes[mostVoteIndex]} />

    </div>
  )

}

export default App