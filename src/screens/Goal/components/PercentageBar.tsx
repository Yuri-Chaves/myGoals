import React from 'react'
import { Dimensions } from 'react-native'

import { Box, Text } from '@components'

interface Props {
  value: number
  goal: number
}

export function PercentageBar({ goal, value }: Props) {
  const barSize = Dimensions.get('window').width - 64
  const valueInPercent = ((value / goal) * 100).toFixed(2)
  const widthInPercent = Math.round((+valueInPercent / 100) * barSize)

  return (
    <Box
      width={barSize}
      height={24}
      bg="grey3"
      mt="s32"
      borderRadius="br12"
      paddingRight="s16"
      alignItems="flex-end"
      position="relative"
      overflow="hidden"
      justifyContent="center">
      <Box
        width={widthInPercent}
        bg="green"
        position="absolute"
        left={0}
        height={24}
        borderRadius="br12"
      />
      <Text preset="FS-12|LH-14" weight="semibold">
        {valueInPercent}%
      </Text>
    </Box>
  )
}
