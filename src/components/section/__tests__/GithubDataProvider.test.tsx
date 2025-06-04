import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useContext } from 'react';
import { GithubDataProvider, GithubDataContext } from '../../../context/GithubDataProvider';
import { TEST_DATA } from '../../../constants';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <GithubDataProvider>{children}</GithubDataProvider>
);

describe('GithubDataProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('provides initial context values', () => {
    const { result } = renderHook(() => useContext(GithubDataContext), { wrapper });
    
    expect(result.current?.searchInput).toBe('');
    expect(result.current?.users).toEqual([]);
    expect(result.current?.loadingUsers).toBe(false);
    expect(result.current?.onTyping).toBe(false);
  });

  it('updates search input and sets typing state', () => {
    const { result } = renderHook(() => useContext(GithubDataContext), { wrapper });
    
    act(() => {
      result.current?.setSearchInput(TEST_DATA.USERNAME);
    });
    
    expect(result.current?.searchInput).toBe(TEST_DATA.USERNAME);
    expect(result.current?.onTyping).toBe(true);
  });

  it('clears search and resets state', () => {
    const { result } = renderHook(() => useContext(GithubDataContext), { wrapper });
    
    act(() => {
      result.current?.setSearchInput(TEST_DATA.USERNAME);
      result.current?.setUsers([{ id: 1, login: 'test', avatar_url: 'url', html_url: 'url' }]);
    });
    
    act(() => {
      result.current?.clearSearch();
    });
    
    expect(result.current?.searchInput).toBe('');
    expect(result.current?.users).toEqual([]);
  });

  it('performs user search successfully', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        items: [{ id: 1, login: TEST_DATA.USERNAME, avatar_url: 'url' }],
        total_count: 1
      }),
    });

    const { result } = renderHook(() => useContext(GithubDataContext), { wrapper });
    
    await act(async () => {
      await result.current?.searchUsers(TEST_DATA.USERNAME);
    });
    
    expect(result.current?.users).toHaveLength(1);
    expect(result.current?.users[0].login).toBe(TEST_DATA.USERNAME);
    expect(result.current?.totalCount).toBe(1);
  });
});