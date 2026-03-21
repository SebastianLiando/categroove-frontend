import {beforeEach, vi} from 'vitest';

Object.defineProperty(globalThis, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn()
  }))
})

// Simulate ng-serve address
const baseAddress = "http://localhost:4200"
Object.defineProperty(globalThis, 'location', {
  writable: true,
  value: {
    href: baseAddress
  }
})

beforeEach(() => {
  globalThis.location.href = baseAddress
})
