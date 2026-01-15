import {useState} from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {id: '1', name: 'Arto Hellas', number: ''}
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const personId = () => {
    const maxId = persons.length > 0
    ? Math.max(...persons.map( (person) => Number(person.id)))
    : 0
    return String(maxId + 1)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // check for duplicate 
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return // stop the handleSubmit here, so we don't add the duplicate name.
    }
    const newPerson = {
      name: newName,
      id: personId(),
      number: newNumber,
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumChange}/>
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p key={person.id} >{person.name} {person.number}</p>)}

    </div>
  )
}

export default App