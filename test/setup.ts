import {beforeEach, expect, vi} from 'vitest';

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

// === Custom vitest matchers ===
expect.extend({
  toBeBlank(received) {
    const {isNot} = this
    return {
      pass: received !== null && received !== undefined && typeof received === 'string' && received.trim() === '',
      message: () => `expected ${received} to${isNot ? ' not' : ''} be blank`
    }
  }
})
