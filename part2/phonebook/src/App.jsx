import {useState, useEffect} from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')

  useEffect( ()=>{
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons)) 
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
    personService
      .create(newPerson)
      .then((returnedPerson)=>{
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
    
  }
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumChange = (event) => setNewNumber(event.target.value)
  const handleFilter = (event) => setFilter(event.target.value)
  const handleDelete = (id) => {
    const deleteItem = persons.find(person => person.id === id)
    if (window.confirm(` Are you sure to delete "${deleteItem.name}"?`)) {
      personService
        .remove(id)
        .then(()=> setPersons(persons.filter(n => n.id !== id)))
      }
  }

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
      <Persons personToShow={personToShow} handleDelete={handleDelete}/>
    </div>
  )
}

export default App