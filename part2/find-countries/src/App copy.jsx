import {useState, useEffect} from 'react'
import axios from 'axios'

const App = () => {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([])
  const [shown, setShown] = useState({})

  useEffect(() => {
    console.log('effect run, countries are now', countries)
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((response) => {
        setCountries(response.data)
      })
  
  }, [])

  const handleChange = (event) => {
    setValue(event.target.value)
    console.log('all countries are:', countries)
    const findCountries = countries.filter(country => country.name.common.includes(event.target.value))
    console.log('find countries: ',findCountries)
    if (findCountries.length === 0) {
      console.log('not in the list')
      
      return (setShown({shownInfo: "Please enter a country"}))
    } else if (findCountries.length === 1) {

      console.log('find it!')
      
      return (setShown({
        commonName: findCountries[0].name.common,
        capital: findCountries[0].capital,
      }))
    } else if (findCountries.length > 10) {
      console.log('over 10')
      
      return (setShown({shownInfo: "Too many matches, specify another filter"}))
    } else {
      return(setShown({
        name: findCountries.name.common
      }))
    }

  }
    

  return(
    <div>
        find countries <input value={value} onChange={handleChange} />
        <p>{shown.shownInfo}</p>
        <p>{shown.name}</p>
        <h1>{shown.commonName}</h1>
        <p>{shown.capital}</p>
       
        
    </div>
)




}


export default App