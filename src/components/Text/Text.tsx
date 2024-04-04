import React from 'react'
import { TextStyle } from 'react-native'

import { createText } from '@shopify/restyle'

import { Theme } from '@theme'
const SRText = createText<Theme>()
type SRTextProps = React.ComponentProps<typeof SRText>

type TextVariants =
  | 'FS-12|LH-14'
  | 'FS-14|LH-17'
  | 'FS-16|LH-19'
  | 'FS-16|LH-22'
  | 'FS-20|LH-24'
  | 'FS-36|LH-49'
  | 'buttonTitle'

export interface TextProps
  extends Omit<SRTextProps, 'fontFamily' | 'fontWeight'> {
  /**
   * @default 'FS-14|LH-17'
   */
  preset?: TextVariants
  /**
   * @default 'regular'
   */
  weight?: 'bold' | 'regular' | 'semibold'
}
export function Text({
  children,
  preset = 'FS-14|LH-17',
  weight = 'regular',
  style,
  ...sRTextProps
}: TextProps) {
  const fontFamily = getFontFamily(weight)

  return (
    <SRText
      color="backgroundContrast"
      style={[$fontSizes[preset], { fontFamily }, style]}
      {...sRTextProps}>
      {children}
    </SRText>
  )
}

export function getFontFamily(weight: TextProps['weight']) {
  switch (true) {
    case weight === 'bold':
      return $fontFamily.bold
    case weight === 'regular':
      return $fontFamily.regular
    case weight === 'semibold':
      return $fontFamily.semibold
  }
}

export const $fontSizes: Record<TextVariants, TextStyle> = {
  'FS-12|LH-14': {
    fontSize: 12,
    lineHeight: 14,
  },
  'FS-14|LH-17': {
    fontSize: 14,
    lineHeight: 17,
  },
  'FS-16|LH-19': {
    fontSize: 16,
    lineHeight: 19,
  },
  'FS-16|LH-22': {
    fontSize: 16,
    lineHeight: 22,
  },
  'FS-20|LH-24': {
    fontSize: 20,
    lineHeight: 24,
  },
  'FS-36|LH-49': {
    fontSize: 36,
    lineHeight: 49,
  },
  buttonTitle: {
    fontSize: 14,
    lineHeight: 22,
    textTransform: 'uppercase',
  },
}

export const $fontFamily = {
  bold: 'OpenSans-Bold',
  regular: 'OpenSans-Regular',
  semibold: 'OpenSans-SemiBold',
}
