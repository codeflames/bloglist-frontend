import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('calls createBlog with the correct details when a new blog is created', async () => {
    // Arrange
    const mockCreateBlog = jest.fn()
    render(<BlogForm createBlog={mockCreateBlog} />)

    const titleInput = screen.getByPlaceholderText('Blog Title')
    const authorInput = screen.getByPlaceholderText('Blog Author')
    const urlInput = screen.getByPlaceholderText('Blog URL')
    const createButton = screen.getByText('Create')

    // Act
    fireEvent.change(titleInput, { target: { value: 'Test Title' } })
    fireEvent.change(authorInput, { target: { value: 'Test Author' } })
    fireEvent.change(urlInput, { target: { value: 'Test URL' } })
    fireEvent.click(createButton)

    // Assert
    expect(mockCreateBlog.mock.calls).toHaveLength(1)
    expect(mockCreateBlog).toHaveBeenCalledWith({
      title: 'Test Title',
      author: 'Test Author',
      url: 'Test URL',
    })
  })
})