import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '012 3456789'
    }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  

  const addNote = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return
    }
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
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

  return (
    <div>
      <h2>Phonebook</h2>
      {/* käytin tätä ({Form()}) muotoa funkiton kutsusta sillä tavallinen <Form /> lopetti inputin focusin
      eli yhden kirjaimen jälkeen ei voinut kirjoittaa enempää klikkaamatta kenttää uudestaan  */}
      {Form()}
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  )
}

const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map(person =>
        <p key={person.name}> {person.name} {person.number} </p>
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

export default App
