import { render, type RenderOptions } from '@testing-library/react';
import TestWrapper from './TestWrapper';

const customRender = (ui: React.ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: TestWrapper, ...options });

export * from '@testing-library/react';
export { customRender as render };