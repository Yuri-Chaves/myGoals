import React from 'react'

import { Path, Svg } from 'react-native-svg'

import { IconBase } from '@components'

export function Minus({ color = '#000', size = 24 }: IconBase) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M19 13H5V11H19V13Z" fill={color} />
    </Svg>
  )
}
