import {definePreset} from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'

export const categroovePreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{violet.50}',
      100: '{violet.100}',
      200: '{violet.200}',
      300: '{violet.300}',
      400: '{violet.400}',
      500: '{violet.500}',
      600: '{violet.600}',
      700: '{violet.700}',
      800: '{violet.800}',
      900: '{violet.900}',
      950: '{violet.950}'
    },
    colorScheme: {
      light: {
        text: {
          color: '#111827',
          mutedColor: '#9CA3AF'
        },
        surface: {
          0: 'var(--color-ghost-50)',
          50: 'var(--color-ghost-50)',
          100: 'var(--color-ghost-100)',
          200: 'var(--color-ghost-200)',
          300: 'var(--color-ghost-300)',
          400: 'var(--color-ghost-400)',
          500: 'var(--color-ghost-500)',
          600: 'var(--color-ghost-600)',
          700: 'var(--color-ghost-700)',
          800: 'var(--color-ghost-800)',
          900: 'var(--color-ghost-900)',
          950: 'var(--color-ghost-950)',
        }
      },
      dark: {
        text: {
          color: '#F9FAFB',
          mutedColor: '#9CA3AF'
        },
        surface: {
          50: 'var(--color-ghost-50)',
          100: 'var(--color-ghost-100)',
          200: 'var(--color-ghost-200)',
          300: 'var(--color-ghost-300)',
          400: 'var(--color-ghost-400)',
          500: 'var(--color-ghost-500)',
          600: 'var(--color-ghost-600)',
          700: 'var(--color-ghost-700)',
          800: 'var(--color-ghost-800)',
          900: 'var(--color-ghost-900)',
          950: 'var(--color-ghost-950)',
        }
      }
    }
  }
})
