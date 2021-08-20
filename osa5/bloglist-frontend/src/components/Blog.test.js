import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('at start blog renders title but not url and likes', () => {
  const blog = {
    title: 'test_title',
    author: 'test_author',
    url: 'test_url'
  }

  const mocFunc = () => {
    console.log('tested')
  }

  const component = render(
    <Blog blog={blog} setChange={mocFunc} />
  )

  expect(component.container).toHaveTextContent(
    'test_title'
  )
  expect(component.container).not.toHaveTextContent(
    'test_url'
  )
  expect(component.container).not.toHaveValue(
    'likes'
  )
})