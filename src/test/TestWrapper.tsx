import React from 'react';
import { MantineProvider } from '@mantine/core';
import { GithubDataProvider } from '../context/GithubDataProvider';

interface TestWrapperProps {
  children: React.ReactNode;
}

const TestWrapper: React.FC<TestWrapperProps> = ({ children }) => {
  return (
    <MantineProvider>
      <GithubDataProvider>
        {children}
      </GithubDataProvider>
    </MantineProvider>
  );
};

export default TestWrapper;