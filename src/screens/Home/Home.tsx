import React, { useCallback } from 'react'

import { useFocusEffect } from '@react-navigation/native'

import {
  Box,
  DEFAULT_PADDING_HORIZONTAL,
  Form,
  GoalsList,
  Screen,
  Text,
  TransactionList,
} from '@components'
import { useDBProvider } from '@services'

export function Home() {
  const { fetchTransactions, goals } = useDBProvider()

  useFocusEffect(
    useCallback(() => {
      fetchTransactions()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  )

  return (
    <Screen noPaddingHorizontal>
      <Box mb="s42" paddingHorizontal={DEFAULT_PADDING_HORIZONTAL}>
        <Text preset="FS-36|LH-49" weight="bold">
          Suas Metas
        </Text>
        <Text preset="FS-16|LH-19">
          Poupe hoje para colher os frutos amanhã
        </Text>
      </Box>
      <Box mb="s42" paddingLeft={DEFAULT_PADDING_HORIZONTAL}>
        <GoalsList onPressAdd={() => Form.expand('goal')} />
      </Box>
      <Box mb="s24" paddingHorizontal={DEFAULT_PADDING_HORIZONTAL}>
        <Text preset="FS-16|LH-19" weight="semibold" mb="s10">
          Transações
        </Text>
        <Box width="100%" height={1} bg="grey3" />
      </Box>
      <TransactionList />
    </Screen>
  )
}
