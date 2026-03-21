import {defineConfig} from 'vitest/config';

export default defineConfig({
  test: {
    restoreMocks: true,
    setupFiles: ['test/setup.ts'],
    onUnhandledError(error): boolean | void {
      // Return false to ignore errors you expect to be handled by Angular
      if (error.message.includes('Mock Error')) return false;
    },
  }
})
