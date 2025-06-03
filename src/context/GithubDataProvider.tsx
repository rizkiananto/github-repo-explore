import React, { useState, useEffect, useCallback, createContext } from 'react';
import { USERS_TOTAL_LIMIT } from '../constants/config';
import { type IUser, type IRepository } from '../types';

interface IGithubContextType {
  searchInput: string;
  users: IUser[];
  user: IUser | null;
  repos: IRepository[];
  loadingUsers: boolean;
  loadingRepos: boolean;
  onTyping: boolean;
  error: string;
  totalCount: number;
  setSearchInput: (username: string) => void
  searchUsers: (value: string) => Promise<void>;
  setUsers: React.Dispatch<React.SetStateAction<IUser[]>>;
  selectUser: (user: IUser | null) => Promise<void>;
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
  const [user, setUser] = useState<IUser | null>(null);
  const [repos, setRepos] = useState<IRepository[]>([]);
  const [loadingUsers, setLoadingUsers] = useState<boolean>(false);
  const [loadingRepos, setLoadingRepos] = useState<boolean>(false);
  const [onTyping, setOnTyping] = useState<boolean>(false);
  const [error, setError] = useState("");

  const defaultEmptiedState = () => {
    setUser(null);
    setUsers([]);
    setRepos([]);
    setError('');
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

  const searchUsers = useCallback(async (name: string) => {
    if (!name) return;
    defaultEmptiedState();
    setOnTyping(false);
    setLoadingUsers(true);
    // setTimeout(() => {
    //   const filteredUsers: IUser[] = charactersList.map((user: IUser) => ({
    //     id: user.id,
    //     login: user.login,
    //     avatar_url: user.avatar_url,
    //     repo_list: [],
    //   }))
    //   setUsers(filteredUsers);
    //   setLoadingUsers(false);
    // }, 500)
    
    try {
      const response = await fetch(`https://api.github.com/search/users?q=${encodeURIComponent(name)}&per_page=${USERS_TOTAL_LIMIT}`);
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
        }))
        setUsers(filteredUsers);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingUsers(false);
    }
  }, [])

  useEffect(() => {
    const trimmedInput = searchInput.trim();
    if (!trimmedInput) {
      defaultEmptiedState();
    }

    const timeOutSearch = setTimeout(() => {
      searchUsers(trimmedInput)
    }, 1000);

    return () => clearTimeout(timeOutSearch);
  }, [searchInput, searchUsers])

  const clearSearch = ():void => {
    setSearchInput("");
    defaultEmptiedState();
  }

  const selectUser = async () => {}

  return (
    <GithubDataContext.Provider value={{
      searchInput,
      users,
      user,
      totalCount,
      repos,
      loadingUsers,
      loadingRepos,
      onTyping,
      error,
      setSearchInput: handleSearchInput,
      searchUsers,
      setUsers,
      selectUser,
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
