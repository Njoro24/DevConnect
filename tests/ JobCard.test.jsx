
import { render, screen } from '@testing-library/react'
import JobCard from '../src/components/common/JobCard.jsx'

describe('JobCard Component', () => {
  it('renders all job information', () => {
    render(
      <JobCard
        title="Build React App"
        budget={500}
        clientName="Alice"
        status="open"
      />
    )

    expect(screen.getByText('Build React App')).toBeInTheDocument()
    expect(screen.getByText(/Alice/)).toBeInTheDocument()

    expect(screen.getByText(/KES\s*500/)).toBeInTheDocument()

    expect(screen.getByText('OPEN')).toBeInTheDocument()
  })
})
