import {useState} from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {id: '1', name: 'Arto Hellas'}
  ])
  const [newName, setNewName] = useState('')

  const personId = () => {
    const maxId = persons.length > 0
    ? Math.max(...persons.map( (person) => Number(person.id)))
    : 0
    return String(maxId + 1)
    
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setPersons(persons.concat({id: personId(), name: newName }))
    setNewName('')

    
  }
  const handleChange = (event) => {
    setNewName(event.target.value)
  }

    
  

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleChange} />
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p key={person.id} >{person.name}</p>)}

    </div>
  )
}

export default App