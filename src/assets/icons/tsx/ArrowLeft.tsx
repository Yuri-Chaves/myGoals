import React from 'react'

import { Path, Svg } from 'react-native-svg'

import { IconBase } from '@components'

export function ArrowLeft({ color = '#000', size = 24 }: IconBase) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M22.6875 10.6875V13.3125H6.4375L13.875 20.8125L12 22.6875L1.3125 12L12 1.3125L13.875 3.1875L6.4375 10.6875H22.6875Z"
        fill={color}
      />
    </Svg>
  )
}
