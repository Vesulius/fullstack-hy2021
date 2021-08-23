import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {

  let component
  let mockHandler

  beforeEach(() => {
    mockHandler = jest.fn()

    component = render(
      <BlogForm addBlog={mockHandler} />
    )
  })

  test('create button sends correct information to handler', () => {
    const create = component.getByText('create')
    const titleInput = component.container.querySelector('#title')
    const authorInput = component.container.querySelector('#author')
    const urlInput = component.container.querySelector('#url')

    fireEvent.change(titleInput, {
      target: { value: 'test_title' }
    })
    fireEvent.change(authorInput, {
      target: { value: 'test_author' }
    })
    fireEvent.change(urlInput, {
      target: { value: 'test_url' }
    })
    fireEvent.submit(create)

    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0]).toBe('test_title')
    expect(mockHandler.mock.calls[0][1]).toBe('test_author')
    expect(mockHandler.mock.calls[0][2]).toBe('test_url')
  })
})
