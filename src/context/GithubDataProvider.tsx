import React, { useState, useEffect, useCallback, createContext, useRef } from 'react';
import { USERS_TOTAL_LIMIT } from '../constants/config';
import { type IUser } from '../types';
import { API_URL } from '../constants/api';
import toast from 'react-hot-toast';
import { validateUsername } from '../utils/validation';
import { LABELS } from '../constants';

interface IGithubContextType {
  searchInput: string;
  users: IUser[];
  loadingUsers: boolean;
  loadingRepos: boolean;
  onTyping: boolean;
  error: string;
  errorInput: string;
  totalCount: number;
  setSearchInput: (username: string) => void
  searchUsers: (value: string) => Promise<void>;
  setUsers: React.Dispatch<React.SetStateAction<IUser[]>>;
  setLoadingUsers: (load: boolean) => void;
  setLoadingRepos: (load: boolean) => void;
  setOnTyping: (typing: boolean) => void;
  clearSearch: () => void; 
}

const GithubDataContext = createContext<IGithubContextType | null>(null);

function GithubDataProvider({children}: {children: React.ReactNode}) {
  const [searchInput, setSearchInput] = useState("");
  const [users, setUsers] = useState<IUser[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loadingUsers, setLoadingUsers] = useState<boolean>(false);
  const [loadingRepos, setLoadingRepos] = useState<boolean>(false);
  const [onTyping, setOnTyping] = useState<boolean>(false);
  const [error, setError] = useState("");
  const [errorInput, setErrorInput] = useState("");

  const searchAbortControllerRef = useRef<AbortController | null>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const defaultEmptiedState = () => {
    setUsers([]);
    setError('');
    setErrorInput('');
    setOnTyping(false);
    setLoadingRepos(false);
    setLoadingUsers(false);
    setTotalCount(0);
    return;
  }

  const handleSearchInput = (username:string) => {
    setOnTyping(true);
    setSearchInput(username);
  }

  const searchUsers = useCallback(async (name: string, signal?: AbortSignal) => {
    if (!name) return;
    const isValid = validateUsername(name);
    if (!isValid) {
      setErrorInput(LABELS.INPUT_INVALID);
      return;
    }
    defaultEmptiedState();
    setOnTyping(false);
    setLoadingUsers(true);
    
    try {
      const response = await fetch(
        `${API_URL}search/users?q=${encodeURIComponent(name)}+in:login&per_page=${USERS_TOTAL_LIMIT}`,
        {signal}
      );

      if (signal?.aborted) {
        console.log('Search request was cancelled');
        return;
      }

      if (!response.ok) {
        throw new Error("Search Failed");
      };
      
      const responseData = await response.json();
      
      if (responseData.items.length === 0) {
        setError("No github account with that username")
      } else {
        setTotalCount(responseData.total_count);
        const filteredUsers: IUser[] = responseData.items.map((user: IUser) => ({
          id: user.id,
          login: user.login,
          avatar_url: user.avatar_url,
          html_url: user.html_url
        }))
        setUsers(filteredUsers);
      }
    } catch (error) {
      toast.error("Error when fetching User from Git API")
      console.error(error)
    } finally {
      setLoadingUsers(false);
    }
  }, [])

  useEffect(() => {
    setErrorInput('');
    const trimmedInput = searchInput.trim();
    // cleanup
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }
    if (searchAbortControllerRef.current) {
      searchAbortControllerRef.current.abort();
    }

    const abortController = new AbortController();
    searchAbortControllerRef.current = abortController;

    if (!trimmedInput) {
      defaultEmptiedState();
    }

    searchTimeoutRef.current = setTimeout(() => {
      if (!abortController.signal.aborted) {
        searchUsers(trimmedInput, abortController.signal)
      }
    }, 1000);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      abortController.abort();
    }
  }, [searchInput, searchUsers])

  const clearSearch = ():void => {
    setSearchInput("");
    defaultEmptiedState();
  }

  return (
    <GithubDataContext.Provider value={{
      searchInput,
      users,
      totalCount,
      loadingUsers,
      loadingRepos,
      onTyping,
      error,
      errorInput,
      setSearchInput: handleSearchInput,
      searchUsers,
      setUsers,
      setLoadingUsers,
      setLoadingRepos,
      setOnTyping,
      clearSearch 
    }}>
      {children}
    </GithubDataContext.Provider>
  )
}

export {GithubDataContext, GithubDataProvider};
