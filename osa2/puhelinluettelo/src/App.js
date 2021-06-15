import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const baseUrl = 'http://localhost:3001/persons'

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchWord, setSearchWord] = useState('')
  const [shownPersons, setShownPersons] = useState(persons)

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleSearchChange = (event) => {
    setSearchWord(event.target.value)
    // tämänhetkinen hakusanan arvo on välitettävä filterille propsien kautta sillä searchword ei ole vielä päivitetty
    filter(event.target.value, setShownPersons, persons)
  }

  useEffect(() => {
    axios
      .get(baseUrl)
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addNote = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return
    }
    const newPerson = {
      name: newName,
      number: newNumber,
    }

    axios
      .post(baseUrl, newPerson)
      .then(response => {
        setPersons(persons.concat(response.data))
      })

    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }

  const Form = () => {
    return (
      <form onSubmit={addNote}>
        <Field name={'name'} value={newName} changeHandler={handleNameChange} />
        <Field name={'number'} value={newNumber} changeHandler={handleNumberChange} />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
  }

  const List = () => {
    return (
      <div>
        {shownPersons.map(person =>
          <p key={person.name}> {person.name} {person.number} </p>
        )}
      </div>
    )
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Field name={'filter shown with'} value={searchWord} changeHandler={handleSearchChange} />
      {/* käytin tätä ({Form()}) muotoa funkiton kutsusta sillä tavallinen <Form /> lopetti inputin focusin
      eli yhden kirjaimen jälkeen ei voinut kirjoittaa enempää klikkaamatta kenttää uudestaan  */}
      <h2>add a new</h2>
      {Form()}
      <h2>Numbers</h2>
      <List foundPersons={shownPersons} />
    </div>
  )
}

const filter = (search, setShownPersons, persons) => setShownPersons(persons.filter(person => person.name.match(search)))

const Field = ({ name, value, changeHandler }) => {
  return (
    <div>
      {name}: <input value={value} onChange={changeHandler} />
    </div>
  )
}

export default App
