import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {

  let component
  let mockLikeHandler

  beforeEach(() => {
    const user = {
      id: 'test_id',
      name: 'test_name',
      username: 'test_username'
    }
    const blog = {
      id: '1234',
      title: 'test_title',
      author: 'test_author',
      url: 'test_url',
      likes: 5,
      user
    }

    const mockChangeHandler = jest.fn()
    mockLikeHandler = jest.fn()

    component = render(
      <Blog blog={blog} setChange={mockChangeHandler} handleLike={mockLikeHandler} />
    )
  })

  test('at start blog renders title but not url and likes', () => {
    expect(component.container).toHaveTextContent(
      'test_title'
    )
    expect(component.container).not.toHaveTextContent(
      'test_url'
    )
    expect(component.container).not.toHaveTextContent(
      'likes'
    )
  })

  test('after clicking show url and likes are visible', () => {
    const button = component.getByText('show')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
      'test_url'
    )
    expect(component.container).toHaveTextContent(
      'likes'
    )
  })

  test('clicking like button twice calls eventHandler twice', () => {
    const showButton = component.getByText('show')
    fireEvent.click(showButton)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockLikeHandler.mock.calls).toHaveLength(2)
  })
})
