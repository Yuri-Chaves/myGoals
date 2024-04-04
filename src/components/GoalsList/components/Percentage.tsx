import React from 'react'

import { Box, BoxProps, Text } from '@components'

interface Props {
  value: number
  goal: number
}
export function Percentage({ goal, value }: Props) {
  const valueInPercent = ((value / goal) * 100).toFixed(2)
  const widthInPercent = Math.round((+valueInPercent / 100) * 116)

  return (
    <Box
      width={116}
      bg="grey3"
      paddingHorizontal="s8"
      alignItems="flex-end"
      overflow="hidden"
      position="relative"
      justifyContent="center"
      {...$Box}>
      <Box
        width={widthInPercent}
        bg="green"
        position="absolute"
        left={0}
        {...$Box}
      />
      <Text preset="FS-12|LH-14" weight="semibold">
        {valueInPercent}%
      </Text>
    </Box>
  )
}

const $Box: BoxProps = {
  height: 24,
  borderRadius: 'br12',
}
