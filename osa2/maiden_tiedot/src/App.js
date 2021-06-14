import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [foundCountries, setFoundCountries] = useState([])
  const [search, setSearch] = useState('')
  const [weatherData, setWeatherData] = useState()
  const apiKey = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const GetWeather = () => {
    useEffect(() => {
      axios
        .get('http://api.weatherstack.com/current', {
          params: {
            access_key: apiKey,
            query: foundCountries[0].capital
          }
        })
        .then(response => {
          const data = {
            capital: foundCountries[0].capital,
            temperature: response.data.current.temperature,
            icon: response.data.current.weather_icons[0],
            windSpeed: response.data.current.wind_speed,
            windDirection: response.data.current.wind_dir
          }
          setWeatherData(data)
        })
    }, [])
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
    setFoundCountries(countries.filter(country => country.name.toLowerCase().match(event.target.value.toLowerCase())))
  }

  const handleClick = (country) => {
    const copy = {
      ...country,
      key: country.name
    }
    setFoundCountries([copy])
  }

  const Results = () => {
    if (foundCountries.length > 10) {
      return <p>Too many matches, specify another filter</p>
    } else if (foundCountries.length === 1) {
      return <DisplayCountry country={foundCountries[0]} languages={foundCountries[0].languages} />
    } else {
      return (
        <ListCountries foundCountries={foundCountries} handleClick={handleClick} />
      )
    }
  }

  const Weather = () => {
    if (weatherData === undefined || weatherData.capital !== foundCountries[0].capital) {
      GetWeather()
      return <div><p>no weather available</p></div>
    }
    return (
      <div>
        <h2>Weather in {weatherData.capital}</h2>
        <p>temperature: {weatherData.temperature} Celsius</p>
        <img src={weatherData.icon} alt="weather_icon" height='100' />
        <p>wind: {weatherData.windSpeed} km/h, direction {weatherData.windDirection} </p>
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
        <Weather />
      </div>
    )
  }

  return (
    <div>
      find countries <input value={search} onChange={handleSearchChange} />
      <Results />
    </div>
  )
}

const ListCountries = ({ foundCountries, handleClick }) => {
  return (
    foundCountries.map(country => {
      return (
        <div key={country.name}>
          <p>
            {country.name}
            <button onClick={() => handleClick(country)}> show </button>
          </p>
        </div>
      )
    })
  )
}

export default App;