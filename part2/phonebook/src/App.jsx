import {useState, useEffect} from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')

  useEffect( ()=>{    
    axios
      .get('http://localhost:3002/persons')
      .then(response => {
        setPersons(response.data)
      })
  },[])

  const handleSubmit = (event) => {
    event.preventDefault()
    // check for duplicate 
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return // stop the handleSubmit here, so we don't add the duplicate name.
    }
    
    const newPerson = {
      name: newName,
      number: newNumber,
    }
    axios
      .post('http://localhost:3002/persons', newPerson)
      .then((response)=>{
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
    
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
      <Filter newFilter={newFilter} handleFilter={handleFilter} />
      <h3>Add a new </h3>
      <PersonForm  handleSubmit={handleSubmit} newName={newName} handleNameChange={handleNameChange}  newNumber={newNumber} handleNumChange={handleNumChange} />
      <h2>Numbers</h2>
      <Persons personToShow={personToShow} />
    </div>
  )
}

export default App