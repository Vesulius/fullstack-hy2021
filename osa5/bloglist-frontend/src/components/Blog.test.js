import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {

  let component

  beforeEach(() => {

    const user = {
      id: 'test_id',
      name: 'test_name',
      username: 'test_username'
    }
    const blog = {
      title: 'test_title',
      author: 'test_author',
      url: 'test_url',
      likes: 5,
      user
    }

    const mocFunc = () => {
      console.log('tested')
    }

    component = render(
      <Blog blog={blog} setChange={mocFunc} />
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
})
