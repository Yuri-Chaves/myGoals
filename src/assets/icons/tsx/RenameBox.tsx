import React from 'react'

import { Path, Svg } from 'react-native-svg'

import { IconBase } from '@components'

export function RenameBox({ color = '#000', size = 24 }: IconBase) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M18 17H10.5L12.5 15H18M6 17V14.5L13.88 6.65C14.07 6.45 14.39 6.45 14.59 6.65L16.35 8.41C16.55 8.61 16.55 8.92 16.35 9.12L8.47 17M19 3H5C3.89 3 3 3.89 3 5V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V5C21 3.89 20.1 3 19 3Z"
        fill={color}
      />
    </Svg>
  )
}
