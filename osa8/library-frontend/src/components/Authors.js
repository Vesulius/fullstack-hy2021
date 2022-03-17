import { useMutation, useQuery } from "@apollo/client"
import { useState } from "react"
import Select from "react-select"
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries"

const Authors = (props) => {

  const result = useQuery(ALL_AUTHORS)

  const [editAuthor] = useMutation(EDIT_AUTHOR, { refetchQueries: [{ query: ALL_AUTHORS }] })

  const [name, setName] = useState("")
  const [year, setYear] = useState("")

  if (!props.show || !result.data) {
    return null
  }
  const authors = result.data.allAuthors

  const submit = async (event) => {
    event.preventDefault()

    if (!year) return
    const setBornTo = year 
    
    editAuthor({ variables: { name, setBornTo } })
    setYear("")
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h4>Set birthyear</h4>
      <form onSubmit={submit}>
        <Select
          options={authors.map((a) => ({ value: a.name, label: a.name }))}
          onChange={event => setName(event.value)}
        />
        <div>
          born <input type="number" value={year} onChange={({ target }) => setYear(parseInt(target.value))} />
        </div>
        <button type="sumbit" >update author</button>
      </form>
    </div>
  )
}

export default Authors
