import 'vitest'

declare module 'vitest' {
  interface Matchers<T = any> {
    toBeBlank: () => void
  }
}
