// src/test/test-utils.ts (renamed from .tsx to .ts)
import { render, type RenderOptions } from '@testing-library/react';
import TestWrapper from './TestWrapper';

// Custom render function
const customRender = (ui: React.ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: TestWrapper, ...options });

// Re-export everything from testing library
export * from '@testing-library/react';
export { customRender as render };