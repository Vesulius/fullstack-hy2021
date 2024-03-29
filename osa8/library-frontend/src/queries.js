import { gql } from "@apollo/client"

export const CREATE_BOOK = gql`
  mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      title
    }
  }
`

export const ALL_BOOKS = gql`
  query ($genre: String) {
    allBooks(genre: $genre) {
      id
      title
      author {
        name
      }
      published
      genres
    }
  }
`
export const FAVORITE_GENRE = gql`
  query {
    me {
      favoriteGenre
    }
  }
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
      id
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`
