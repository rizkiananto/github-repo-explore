import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '../test/test-utils';
import App from '../App';
import { TEST_DATA, LABELS } from '../constants';
import { createMockRepo, getClearButton, getHelpText, getSearchInput } from '../test/test-helpers';

const mockUserSearchResponse = {
  items: [
    {
      id: 1,
      login: TEST_DATA.USERNAME,
      avatar_url: 'https://avatar.url'
    }
  ],
  total_count: 1
};

const mockRepoResponse = [
  createMockRepo()
];

describe("App integration test", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders main components", () => {
    render(<App/>);
    const input = getSearchInput();

    expect(screen.getByText(LABELS.APP_TITLE)).toBeInTheDocument();
    expect(screen.getByText(LABELS.APP_SUBTITLE)).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });

  it("show initial help text", () => {
    render(<App/>);
    const helperInitial = getHelpText();
    expect(helperInitial).toBeInTheDocument();
  });

  it('performs user search and displays results', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => mockUserSearchResponse,
    });

    render(<App />);
    
    const input = getSearchInput();
    
    fireEvent.change(input, { target: { value: TEST_DATA.USERNAME } });
    
    await waitFor(() => {
      expect(screen.getByText(LABELS.ACTION_TYPING)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(TEST_DATA.USERNAME)).toBeInTheDocument();
    }, { timeout: 2000 });

    expect(fetch).toHaveBeenCalledTimes(1);
    const fetchCall = vi.mocked(fetch).mock.calls[0];
    const url = fetchCall[0] as string;
    
    expect(url).toContain('api.github.com/search/users');
    expect(url).toContain(`q=${TEST_DATA.USERNAME}`);
    expect(url).toContain('per_page=5');
  });

  it("expands accordion and fetches repositories", async () => {
    global.fetch = vi.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockUserSearchResponse,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockRepoResponse,
      });

      render(<App />);

      const input = getSearchInput();
      fireEvent.change(input, { target: { value: TEST_DATA.USERNAME } });

      await waitFor(() => {
        expect(screen.getByText(TEST_DATA.USERNAME)).toBeInTheDocument();
      }, {timeout: 2000});

      const accordionButton = screen.getByRole('button', { 
        name: new RegExp(TEST_DATA.USERNAME, 'i') 
      });

      fireEvent.click(accordionButton);

      await waitFor(() => {
        expect(screen.getByText(LABELS.ACTION_LOADING_REPO)).toBeInTheDocument();
      });

      await waitFor(() => {
        expect(screen.getByText(TEST_DATA.REPO_NAME)).toBeInTheDocument();
      });

      expect(fetch).toHaveBeenCalledWith(
        `https://api.github.com/users/${TEST_DATA.USERNAME}/repos`,
        expect.objectContaining({
          signal: expect.any(AbortSignal)
        })
      );
  });

  it("handles search with no result", async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ items: [], total_count: 0 }),
    });

    render(<App />);
    
    const input = getSearchInput();
    fireEvent.change(input, { target: { value: 'nonexistentuser' } });
    
    await waitFor(() => {
      expect(screen.getByText(LABELS.ACTION_NO_RESULT)).toBeInTheDocument();
    }, {timeout: 3000});
  })

  it('clears search when clear button is clicked', async () => {
    render(<App />);
    
    const input = getSearchInput() as HTMLInputElement;
    
    fireEvent.change(input, { target: { value: TEST_DATA.USERNAME } });
    expect(input.value).toBe(TEST_DATA.USERNAME);
    
    const clearButton = getClearButton();
    fireEvent.click(clearButton);
    
    expect(input.value).toBe('');
    
    expect(screen.getByText(LABELS.ACTION_INITIAL)).toBeInTheDocument();
  });
})