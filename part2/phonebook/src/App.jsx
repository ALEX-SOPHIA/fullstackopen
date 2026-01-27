import {useState, useEffect} from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')
  const [successfulMessage, setSuccessfulMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect( ()=>{
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons)) 
  },[])

  const handleSubmit = (event) => {
    event.preventDefault()
    // check for duplicate 
    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const findPerson = persons.find(n => n.name === newName )
        const changedPerson = {...findPerson, number: newNumber }
        personService
          .update(changedPerson.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id === changedPerson.id ? returnedPerson : person))
            setSuccessfulMessage(`The number of '${changedPerson.name}' has been updated successfully.`)
            setTimeout(()=>{
              setSuccessfulMessage(null)
            }, 5000)
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            setErrorMessage(`Information of ${findPerson.name} has already been removed from server `)
            setTimeout(()=>{
              setErrorMessage(null)
            }, 5000)
            setPersons(persons.filter(p => p.id !== findPerson.id))
          })
      }
      return
    }
    
    const newPerson = {
      name: newName,
      number: newNumber,
    }
    personService
      .create(newPerson)
      .then((returnedPerson)=>{
        setPersons(persons.concat(returnedPerson))
        setSuccessfulMessage(`Added ${returnedPerson.name}`)
        setTimeout(()=>{
          setSuccessfulMessage(null)
        }, 5000)
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
      <Notification successfulMessage={successfulMessage} errorMessage={errorMessage}/>
      <Filter newFilter={newFilter} handleFilter={handleFilter} />
      <h3>Add a new </h3>
      <PersonForm  handleSubmit={handleSubmit} newName={newName} handleNameChange={handleNameChange}  newNumber={newNumber} handleNumChange={handleNumChange} />
      <h2>Numbers</h2>
      <Persons personToShow={personToShow} handleDelete={handleDelete}/>
    </div>
  )
}

export default App