import { useLazyQuery } from "@apollo/client"
import { useEffect } from "react"
import { ALL_BOOKS, FAVORITE_GENRE } from "../queries"

const Recommendations = (props) => {
  const [userResult, { loading: userLoading, data: userData }] = useLazyQuery(FAVORITE_GENRE)
  let genre = null
  if (userData && userData.me && !userLoading) genre = userData.me.favoriteGenre

  const [bookResult, { loading: bookLoading, data:bookData }] = useLazyQuery(ALL_BOOKS, {
    variables: { genre },
  })

  useEffect(userResult, [props.token]) // eslint-disable-line
  useEffect(bookResult, [genre]) // eslint-disable-line

  if (!props.show || bookLoading) {
    return null
  }

  if (!userData.me) {
    return <p>Log in to see recommendations</p>
  }

  const allBooks = bookData.allBooks

  return (
    <div>
      <h2>Recommendations </h2>
      <p>Based on your favorite genre: {genre}</p>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {allBooks.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations
