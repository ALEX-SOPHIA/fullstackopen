import {useState, useEffect} from 'react'
import axios from 'axios'

const App = () => {
  const api_key = import.meta.env.VITE_WEATHER_KEY
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState(null)

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
  }

  const matches = countries.filter(country => country.name.common.toLowerCase().includes(value.toLowerCase()))
  
  console.log('find countries:',matches)

  const countryName = matches.length === 1 ? matches[0].name.common : null

  console.log(countryName)
  
  useEffect(() => {
    countryName && axios
      .get(`http://api.openweathermap.org/geo/1.0/direct?q=${matches[0].capital[0]}&appid=${api_key}`)
      .then((response) => {
        const lat = response.data[0].lat
        const lon = response.data[0].lon
        axios
          .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
          .then((response) => {
            setWeather(response.data)
          })
      })
  }, [countryName, api_key] )
  console.log(weather)
  
  let contentToShow = null
 
  if (matches.length > 10) {
    contentToShow = <p>Too many matches, specify another filter</p>
  } else if (matches.length === 1) {
    contentToShow = <div>
      <h1>{matches[0].name.common}</h1>
      <p>Capital: {matches[0].capital.join(', ')}</p>
      <p>Area: {matches[0].area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.values(matches[0].languages).map(l => <li key={l}>{l}</li>)}
      </ul>
      <img src={matches[0].flags.png} alt={matches[0].flags.alt } width="150"/>
      {weather && (<div>
        <h2>Weather in {matches[0].capital[0]}</h2>
        <p>Temperature {weather.main.temp}</p>
        <img src= {`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
        <p>Wind {weather.wind.speed} m/s</p>
      </div>)}
    </div>
  } else if (matches.length === 0) {
    contentToShow = <p>Not found</p>
  } else {
    contentToShow = matches.map(country => <p key={country.name.common}>{country.name.common} <button onClick={() => {
      setValue(country.name.common)
    }}>Show</button></p>)
  }

  return(
    <div>
        find countries <input value={value} onChange={handleChange} />
        {contentToShow}
    </div>
)
}
export default App