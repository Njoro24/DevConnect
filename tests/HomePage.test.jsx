import { render, screen } from '@testing-library/react'
import HomePage from '../src/pages/homepage'
import { BrowserRouter } from 'react-router-dom'

describe('HomePage', () => {
  it('renders hero section and call-to-actions', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    )

    expect(screen.getByText('Welcome to SkillSwap')).toBeInTheDocument()
    expect(screen.getByText('Find Jobs')).toBeInTheDocument()
    expect(screen.getByText('Post a Job')).toBeInTheDocument()
  })

  it('renders featured jobs list', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    )

    expect(screen.getByText(/React Frontend Developer Needed/)).toBeInTheDocument()
    expect(screen.getByText(/Flask API Backend/)).toBeInTheDocument()
  })
})
