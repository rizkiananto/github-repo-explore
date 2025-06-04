import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test/test-utils';
import RepoDetail from '../repoCard';
import { createMockRepo } from '../../../test/test-helpers';
import "@testing-library/jest-dom/vitest"

const mockRepo = createMockRepo();

describe('RepoDetail Component', () => {
  it('renders repository information correctly', () => {
    render(<RepoDetail {...mockRepo} />);
    
    expect(screen.getByText(mockRepo.name)).toBeInTheDocument();
    expect(screen.getByText(mockRepo.description)).toBeInTheDocument();
    expect(screen.getByText(mockRepo.language)).toBeInTheDocument();
  });

  it('displays correct stats', () => {
    render(<RepoDetail {...mockRepo} />);
    
    expect(screen.getByText(mockRepo.forks_count.toString())).toBeInTheDocument(); // forks
    expect(screen.getByText(mockRepo.stargazers_count)).toBeInTheDocument(); // stars
    expect(screen.getByText(mockRepo.watchers_count)).toBeInTheDocument(); // watchers
  });

  it('renders visit repo button with correct link', () => {
    render(<RepoDetail {...mockRepo} />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', mockRepo.html_url);
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('handles missing language', () => {
    const repoWithoutLanguage = { ...mockRepo, language: null };
    render(<RepoDetail {...repoWithoutLanguage} />);
    
    expect(screen.queryByText(mockRepo.language)).not.toBeInTheDocument();
  });

  it('handles missing description', () => {
    const repoWithoutDescription = { ...mockRepo, description: null };
    render(<RepoDetail {...repoWithoutDescription} />);
    
    expect(screen.queryByText(mockRepo.description)).not.toBeInTheDocument();
  });
});