import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


describe('<Blog />', () => {

  const blog = {
    title: 'Test title',
    author: 'Test author',
    url: 'Test url',
    likes: 0,
    user: {
      name: 'Test user',
      id: '1234',
      username: 'testuser'

    }
  }

  const currentUser = {
    id: '1234',
    username: 'testuser',
    name: 'Test user',
  }

  let container

  beforeEach(() => {
    const mockHandleLike = jest.fn()
    const mockHandleRemove = jest.fn()
    const mockToggleShowDetails = jest.fn()
    container =   render(<Blog blog={blog} currentUser={currentUser} handleLike={mockHandleLike} mockHandleRemove={mockHandleRemove}>
      <div>
        <button onClick={mockToggleShowDetails}>view</button>
        toggle children
      </div>
    </Blog>).container

    // screen.debug(container)
  })



  test('renders content', () => {

    const titleElement = screen.findByText(blog.title)
    expect(titleElement).toBeDefined()

    const authorElement = screen.findByText(blog.author)
    expect(authorElement).toBeDefined()


  })

  test('at start the children are not displayed', () => {
    const urlElement = screen.queryByText(blog.url)
    expect(urlElement).toBeNull()

    const likesElement = screen.queryByText(`likes ${blog.likes}`)
    expect(likesElement).toBeNull()
  })

  test('after clicking the button, children are displayed', () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    user.click(button)

    screen.debug(container)

    const urlElement = screen.findByText(blog.url)
    expect(urlElement).toBeDefined()

    const likesElement = screen.queryByText(`likes ${blog.likes}`)
    expect(likesElement).toBeDefined()
  })

})

test('clicking the like button twice calls event handler twice', async() => {
  const blog = {
    title: 'Test title',
    author: 'Test author',
    url: 'Test url',
    likes: 0,
    user: {
      name: 'Test user',
      id: '1234',
      username: 'testuser'

    }
  }

  const currentUser = {
    id: '1234',
    username: 'testuser',
    name: 'Test user',
  }

  const mockHandleLike = jest.fn()
  const mockHandleRemove = jest.fn()
  const mockToggleShowDetails = jest.fn()
  const { container } = render(<Blog blog={blog} currentUser={currentUser} handleLike={mockHandleLike} mockHandleRemove={mockHandleRemove}>
    <div>
      <button onClick={mockToggleShowDetails}>view</button>
      toggle children
    </div>
  </Blog>)

  const button = await screen.findByText('view')
  fireEvent.click(button)

  screen.debug(container)

  const urlElement = screen.queryByText(blog.url)
  expect(urlElement).toBeDefined()

  const likesElement = screen.queryByText(`likes ${blog.likes}`)
  expect(likesElement).toBeDefined()

  const likeButton = await screen.findByText('like')
  fireEvent.click(likeButton)

  expect(mockHandleLike.mock.calls).toHaveLength(1)
  fireEvent.click(likeButton)
  expect(mockHandleLike.mock.calls).toHaveLength(2)
})