import { useQuery } from "@apollo/client"
import { useState } from "react"
import { ALL_BOOKS } from "../queries"

const Books = (props) => {
  const [genre, setGenre] = useState("")
  const result = useQuery(ALL_BOOKS)
  if (!props.show || !result.data) {
    return null
  }
  const allBooks = result.data.allBooks

  const books = () => {
    if (genre === "") {
      return allBooks
    }
    const filtered = allBooks.filter(b => b.genres.some(g => g === genre))
    return filtered
  }

  const allGenres = () => {
    const genres = allBooks
      .map((b) => b.genres)
      .flat()
    return [...new Set(genres)]
  }

  const selected = (buttonGenre) => {
    if (genre === buttonGenre) {
      return { color: "darkblue" }
    }
    return { color: "dodgerblue" }
  }

  const buttonAction = (buttonGenre) => {
    if (genre === buttonGenre) {
      setGenre("")
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
          {books().map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {allGenres().map((g) => (
          <button key={g} style={selected(g)} onClick={() => buttonAction(g)}>
            {g}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Books
