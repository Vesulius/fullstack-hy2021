import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data)
}

const add = (newPerson) => {
  return axios.post(baseUrl, newPerson).then((response) => response.data)
}

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((response) => response)
}

const update = (id, newPerson) => {
  return axios.put(`${baseUrl}/${id}`, newPerson).then((response) => response)
}

// Tämä moduuli voitaisiin exportata suoraa mutta silloin react varoittaa: Assign object to a variable before exporting as module default import/no-anonymous-default-export
const personService = {
  getAll,
  add,
  remove,
  update,
}

export default personService
