import React from 'react'
import { ListRenderItemInfo } from 'react-native'

import { TTransactionModel } from '@databases'
import { toCurrencyValue } from '@utils'

import { Box, Icon, Text } from '@components'

export function Transaction({ item }: ListRenderItemInfo<TTransactionModel>) {
  return (
    <Box
      bg="grey2"
      borderColor="grey3"
      borderRadius="br5"
      borderWidth={1}
      paddingHorizontal="s10"
      paddingVertical="s10"
      g="s8">
      <Text preset="FS-16|LH-19" weight="semibold">
        {item.goalName}
      </Text>
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between">
        <Box flexDirection="row" alignItems="center" justifyContent="center">
          <Icon
            name={item.type === 'deposit' ? 'plus' : 'minus'}
            size={17}
            color={item.type === 'deposit' ? 'green' : 'red'}
          />
          <Text color={item.type === 'deposit' ? 'green' : 'red'}>
            R$ {toCurrencyValue(item.value)}
          </Text>
        </Box>
        <Text preset="FS-12|LH-14" color="grey4">
          {item.date}
        </Text>
      </Box>
    </Box>
  )
}
