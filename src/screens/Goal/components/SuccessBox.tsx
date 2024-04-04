import React from 'react'

import { Box, Text } from '@components'

export function SuccessBox() {
  return (
    <Box height={48}>
      <Text color="green" preset="FS-20|LH-24" textAlign="center">
        Você já concluiu este objetivo. Parabéns!
      </Text>
    </Box>
  )
}
