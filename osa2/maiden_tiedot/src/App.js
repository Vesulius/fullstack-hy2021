import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [foundCountries, setFoundCountries] = useState([])
  const [search, setSearch] = useState('')


  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])



  const handleSearchChange = (event) => {
    setSearch(event.target.value)
    setFoundCountries(countries.filter(country => country.name.match(event.target.value)))
  }

  const List = () => {
    if (foundCountries.length > 10) {
      return <p>Too many matches, specify another filter</p>
    } else if (foundCountries.length === 1) {
      return <DisplayCountry country={foundCountries[0]} languages={foundCountries[0].languages} />
    }

    return (
      foundCountries.map(country => {
        return <p key={country.name}> {country.name}</p>
      })
    )
  }

  return (
    <div>
      find countries <input value={search} onChange={handleSearchChange} />
      <List />
    </div>

  )
}

const DisplayCountry = ({ country, languages }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <p>
        capital {country.capital}<br></br>
        polulation {country.population}
      </p>
      <h2>languages</h2>
      <ul>
        {languages.map(language => {
          return <li key={language.name}>{language.name}</li>
        })}
      </ul>
      <img src={country.flag} alt="flag" height='100' />
    </div>
  )
}

export default App;
