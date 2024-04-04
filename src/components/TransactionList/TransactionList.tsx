import React from 'react'
import { FlatList } from 'react-native'

import { useAppSafeArea, useAppTheme } from '@hooks'
import { useDBProvider } from '@services'

import { Box } from '../Box/Box'
import { DEFAULT_PADDING_HORIZONTAL } from '../Screen/Screen'
import { Text } from '../Text/Text'

import { Transaction } from './components/Transaction'

export function TransactionList() {
  const { spacing } = useAppTheme()
  const { bottom } = useAppSafeArea()
  const { transactions } = useDBProvider()

  return (
    <Box paddingHorizontal={DEFAULT_PADDING_HORIZONTAL} flex={1}>
      <FlatList
        keyExtractor={item => item.id}
        data={transactions}
        renderItem={Transaction}
        contentContainerStyle={{
          gap: spacing.s10,
          paddingBottom: bottom,
        }}
        ListEmptyComponent={<ListEmptyComponent />}
      />
    </Box>
  )
}

function ListEmptyComponent() {
  return (
    <>
      <Text textAlign="center" preset="FS-20|LH-24" weight="bold">
        Você ainda não realizou nenhuma transação
      </Text>
      <Text textAlign="center">
        Selecione um objetivo e adicione uma transação
      </Text>
    </>
  )
}
