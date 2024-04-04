import { createTheme } from '@shopify/restyle'

const palette = {
  black: '#000000',
  white: '#FFFFFF',
  green: '#29E0A9',
  blue: '#4551E6',
  red: '#FE6E78',
  grey0: '#040507',
  grey1: '#0E0F11',
  grey2: '#16181A',
  grey3: '#202224',
  grey4: '#7C7C8A',
  grey5: '#888888',
}

export const theme = createTheme({
  colors: {
    ...palette,

    backgroundColor: palette.grey1,
    backgroundContrast: palette.white,
  },
  spacing: {
    s2: 2,
    s8: 8,
    s10: 10,
    s16: 16,
    s24: 24,
    s32: 32,
    s42: 42,
  },
  borderRadii: {
    br5: 5,
    br8: 8,
    br10: 10,
    br12: 12,
    br20: 20,
  },
  textVariants: {
    defaults: {},
  },
})

export type Theme = typeof theme
export type ThemeColors = keyof Theme['colors']
