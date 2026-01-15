import {useState} from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')

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
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumChange = (event) => setNewNumber(event.target.value)
  const handleFilter = (event) => setFilter(event.target.value)
  
  const personToShow = newFilter === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))


  return (
    <div>
      <h2>Phonebook</h2>
      <p>filter shown with <input value={newFilter} onChange={handleFilter}/> </p>
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
      {personToShow.map(person => <p key={person.id} >{person.name} {person.number}</p>)}

    </div>
  )
}

export default App