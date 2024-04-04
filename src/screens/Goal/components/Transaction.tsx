import React from 'react'
import { ListRenderItemInfo } from 'react-native'

import { TTransactionModel } from '@databases'
import { toCurrencyValue } from '@utils'

import { Box, Icon, Text } from '@components'

export function Transaction({ item }: ListRenderItemInfo<TTransactionModel>) {
  const isDeposit = item.type === 'deposit'
  const color = isDeposit ? 'green' : 'red'

  return (
    <Box
      height={64}
      flexDirection="row"
      paddingHorizontal="s10"
      backgroundColor="grey2"
      borderRadius="br5"
      alignItems="center"
      justifyContent="space-between">
      <Box flexDirection="row" alignItems="center">
        <Icon name={isDeposit ? 'plus' : 'minus'} color={color} />
        <Text color={color}>R$ {toCurrencyValue(item.value)}</Text>
      </Box>
      <Text preset="FS-12|LH-14" color="grey4">
        {item.date}
      </Text>
    </Box>
  )
}
