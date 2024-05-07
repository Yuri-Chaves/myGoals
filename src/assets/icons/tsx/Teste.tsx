import React from 'react'

import { Svg } from 'react-native-svg'

import { IconBase } from '@components'

export function Teste({ color = '#000', size = 24 }: IconBase) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    </Svg>
  )
}
