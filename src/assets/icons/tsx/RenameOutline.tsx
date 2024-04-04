import React from 'react'

import { Path, Svg } from 'react-native-svg'

import { IconBase } from '@components'

export function RenameOutline({ color = '#000', size = 24 }: IconBase) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M15 16L11 20H21V16H15ZM12.06 7.19L3 16.25V20H6.75L15.81 10.94L12.06 7.19ZM5.92 18H5V17.08L12.06 10L13 10.94L5.92 18ZM18.71 8.04C19.1 7.65 19.1 7 18.71 6.63L16.37 4.29C16.17 4.09 15.92 4 15.66 4C15.41 4 15.15 4.1 14.96 4.29L13.13 6.12L16.88 9.87L18.71 8.04Z"
        fill={color}
      />
    </Svg>
  )
}
