import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import JobsPage from '../src/pages/jobspage';
import defaultJobs from '../src/data/samplejobs';

describe('JobsPage', () => {
  test('renders jobs and filters correctly', async () => {
    render(
      <MemoryRouter>
        <JobsPage jobs={defaultJobs} />
      </MemoryRouter>
    );

    // Check initial jobs rendered
    expect(screen.getByText(/Find Your Dream Job/i)).toBeInTheDocument();
    expect(screen.getByText(/Job Alerts/i)).toBeInTheDocument();

    // Search for a job title
    const searchInput = screen.getByPlaceholderText(/Search for jobs, companies, or skills/i);
    fireEvent.change(searchInput, { target: { value: defaultJobs[0].title } });

    await waitFor(() => {
      expect(screen.getByText(defaultJobs[0].title)).toBeInTheDocument();
    });

    // Filter by location
    const locationInput = screen.getByPlaceholderText(/Location/i);
    fireEvent.change(locationInput, { target: { value: defaultJobs[0].location } });

    await waitFor(() => {
      expect(screen.getByText(defaultJobs[0].location)).toBeInTheDocument();
    });

    // Filter by job type
    const jobTypeSelect = screen.getByDisplayValue(/Job Type/i);
    fireEvent.change(jobTypeSelect, { target: { value: defaultJobs[0].type } });

    await waitFor(() => {
      expect(screen.getByText(defaultJobs[0].type)).toBeInTheDocument();
    });

    // Filter by remote/on-site
    const workStyleSelect = screen.getByDisplayValue(/Work Style/i);
    const remoteValue = defaultJobs[0].remote ? 'remote' : 'on-site';
    fireEvent.change(workStyleSelect, { target: { value: remoteValue } });

    await waitFor(() => {
      expect(screen.getByText(remoteValue, { exact: false })).toBeInTheDocument();
    });

    // Pagination buttons
    const nextButton = screen.getByText(/Next/i);
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText(/Previous/i)).toBeInTheDocument();
    });
  });
});
