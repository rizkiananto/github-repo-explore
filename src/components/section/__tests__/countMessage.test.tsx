import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../../test/test-utils';
import CountMessage from '../countMessage';
import { GithubDataContext } from '../../../context/GithubDataProvider';
import { TEST_DATA } from '../../../constants';

const mockContextValue = {
  searchInput: TEST_DATA.USERNAME,
  users: [],
  loadingUsers: false,
  loadingRepos: false,
  onTyping: false,
  error: '',
  errorInput: '',
  totalCount: 0,
  setSearchInput: vi.fn(),
  searchUsers: vi.fn(),
  setUsers: vi.fn(),
  setLoadingUsers: vi.fn(),
  setLoadingRepos: vi.fn(),
  setOnTyping: vi.fn(),
  clearSearch: vi.fn(),
};

describe('CountMessage Component', () => {
  it('does not render when totalCount is 0', () => {
    render(
      <GithubDataContext.Provider value={mockContextValue}>
        <CountMessage />
      </GithubDataContext.Provider>
    );
    
    expect(screen.queryByText(/All available data/)).not.toBeInTheDocument();
  });

  it('shows "all data displayed" message when totalCount <= limit', () => {
    const contextWithLowCount = {
      ...mockContextValue,
      totalCount: 3,
      searchInput: TEST_DATA.USERNAME
    };
    
    render(
      <GithubDataContext.Provider value={contextWithLowCount}>
        <CountMessage />
      </GithubDataContext.Provider>
    );
    
    expect(screen.getByText(/All available data related to "testuser" has been displayed/)).toBeInTheDocument();
  });

  it('shows total count message when count exceeds limit', () => {
    const contextWithHighCount = {
      ...mockContextValue,
      totalCount: 100,
      searchInput: TEST_DATA.USERNAME
    };
    
    render(
      <GithubDataContext.Provider value={contextWithHighCount}>
        <CountMessage />
      </GithubDataContext.Provider>
    );
    
    expect(screen.getByText(/We found/)).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('does not render when loading', () => {
    const loadingContext = {
      ...mockContextValue,
      totalCount: 10,
      loadingUsers: true
    };
    
    render(
      <GithubDataContext.Provider value={loadingContext}>
        <CountMessage />
      </GithubDataContext.Provider>
    );
    
    expect(screen.queryByText(/We found/)).not.toBeInTheDocument();
  });
});