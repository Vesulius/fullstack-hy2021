import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchWord, setSearchWord] = useState('')
  const [foundPersons, setFoundPersons] = useState(persons)

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleSearchChange = (event) => {
    setSearchWord(event.target.value)
    // tämänhetkinen hakusanan arvo on välitettävä filterille propsien kautta sillä searchword ei ole vielä päivitetty
    setFoundPersons(Find(event.target.value, persons))
  }

  useEffect(() => {
    personService
      .getAll()
      .then(persons => {
        setPersons(persons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName)) {
      updateNumber()
      return
    }
    const newPerson = {
      name: newName,
      number: newNumber,
    }

    personService
      .add(newPerson)
      .then(person => {
        setPersons(persons.concat(person))
        // uusi henkilö tulee tässäkin lisätä listaan persons sillä todellista listaa ei olla vielä päivitetty
        setFoundPersons(Find(searchWord, persons.concat(person)))
      })
    setNewName('')
    setNewNumber('')
  }

  const removePerson = (id) => {
    if (window.confirm(`Delete ${foundPersons.find(person => person.id === id).name}`)) {
      personService.remove(id)
      setPersons(persons.filter(person => person.id !== id))
      setFoundPersons(foundPersons.filter(person => person.id !== id))
    }
  }

  const updateNumber = () => {
    if (window.confirm(`${newName} is already added to phonebook, replace the old number with new one?`)) {
      const newPerson = {
        name: newName,
        number: newNumber,
      }
      personService
        .update((persons.find(person => newName === person.name).id), newPerson)
        .then(returnedPerson => {
          const copy = persons.map(person => person.name === returnedPerson.data.name ? returnedPerson.data : person)
          setPersons(copy)
          setFoundPersons(Find(searchWord, copy))
        })

    }
  }

  const Form = () => {
    return (
      <form onSubmit={addPerson}>
        <Field name={'name'} value={newName} changeHandler={handleNameChange} />
        <Field name={'number'} value={newNumber} changeHandler={handleNumberChange} />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Field name={'filter shown with'} value={searchWord} changeHandler={handleSearchChange} />
      <h2>add a new</h2>
      {/* Muotoa {Form()} käytetty funkiton kutsussa sillä muoto <Form /> lopetti inputin focusin
      eli yhden kirjaimen jälkeen ei voinut kirjoittaa enempää klikkaamatta kenttää uudestaan  */}
      {Form()}
      <h2>Numbers</h2>
      <List foundPersons={foundPersons} removePerson={removePerson} />
    </div>
  )
}

const List = ({ foundPersons, removePerson }) => {
  return (
    <div>
      {foundPersons.map(person =>
        <div key={person.id}> {person.name} {person.number} <button onClick={() => removePerson(person.id)}> delete </button></div>
      )}
    </div>
  )
}

const Field = ({ name, value, changeHandler }) => {
  return (
    <div>
      {name}: <input value={value} onChange={changeHandler} />
    </div>
  )
}

const Find = (search, persons) => { return persons.filter(person => person.name.match(search)) }

export default App