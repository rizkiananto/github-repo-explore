import { screen } from '@testing-library/react';
import { LABELS, TEST_DATA } from '../constants';

export const getSearchInput = () => 
  screen.getByPlaceholderText(LABELS.INPUT_PLACEHOLDER) as HTMLInputElement;

export const getClearButton = () => 
  screen.getByLabelText(LABELS.CLEAR_BUTTON_ARIA);

export const getHelpText = () => 
  screen.getByText(LABELS.ACTION_INITIAL);

export const typeInSearchInput = (value: string) => {
  const input = getSearchInput();
  return { input, value };
};

export const createMockUser = (overrides = {}) => ({
  id: 1,
  login: TEST_DATA.USERNAME,
  avatar_url: 'https://avatar.url',
  ...overrides,
});

export const createMockRepo = (overrides = {}) => ({
  node_id: 'repo1',
  name: TEST_DATA.REPO_NAME,
  description: 'Test repository',
  language: 'TypeScript',
  html_url: TEST_DATA.REPO_URL,
  forks_count: 5,
  stargazers_count: 10,
  watchers_count: 3,
  ...overrides,
});