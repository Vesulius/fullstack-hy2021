import { useLazyQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { ALL_BOOKS } from "../queries"

const Books = (props) => {
  const [genre, setGenre] = useState(null)
  const [allGenres, setAllGenres] = useState([])
  const [result, {loading, data}] = useLazyQuery(ALL_BOOKS)

  useEffect(() => result({
    variables: { genre },
  }), [genre]) // eslint-disable-line

  useEffect(() => {
    if (data) {
      const newGenres = data.allBooks.map(b => b.genres).flat()
      setAllGenres([...new Set((allGenres.concat(newGenres)))])
    }
  }, [data])
  
  if (!props.show || loading || !data) {
    return null
  }

  const selected = (buttonGenre) => {
    if (genre === buttonGenre) {
      return { color: "darkblue" }
    }
    return { color: "dodgerblue" }
  }

  const buttonAction = (buttonGenre) => {
    if (genre === buttonGenre) {
      setGenre(null)
    } else {
      setGenre(buttonGenre)
    }
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {data.allBooks.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {allGenres.map((g) => (
          <button key={g} style={selected(g)} onClick={() => buttonAction(g)}>
            {g}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Books
