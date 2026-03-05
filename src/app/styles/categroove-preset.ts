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
          50: '{ghost.50}',
          100: '{ghost.100}',
          200: '{ghost.200}',
          300: '{ghost.300}',
          400: '{ghost.400}',
          500: '{ghost.500}',
          600: '{ghost.600}',
          700: '{ghost.700}',
          800: '{ghost.800}',
          900: '{ghost.900}',
          950: '{ghost.950}'
        }
      },
      dark: {
        text: {
          color: '#F9FAFB',
          mutedColor: '#9CA3AF'
        },
        surface: {
          50: '{eerie.50}',
          100: '{eerie.100}',
          200: '{eerie.200}',
          300: '{eerie.300}',
          400: '{eerie.400}',
          500: '{eerie.500}',
          600: '{eerie.600}',
          700: '{eerie.700}',
          800: '{eerie.800}',
          900: '{eerie.900}',
          950: '{eerie.950}'
        }
      }
    }
  }
})
