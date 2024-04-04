import React, { useCallback } from 'react'
import { FlatList } from 'react-native'

import { useFocusEffect } from '@react-navigation/native'
import { toCurrencyValue } from '@utils'

import { Box, Screen, Text } from '@components'
import { useDBProvider } from '@services'

import { ActionButton } from './components/ActionButton'
import { PercentageBar } from './components/PercentageBar'
import { SuccessBox } from './components/SuccessBox'
import { Transaction } from './components/Transaction'

export function GoalScreen() {
  const { goal, fetchGoalTransactions, goalTransactions } = useDBProvider()

  if (!goal) {
    return null
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useFocusEffect(
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useCallback(() => {
      fetchGoalTransactions()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  )

  return (
    <Screen canGoBack>
      <Text preset="FS-36|LH-49" weight="bold" numberOfLines={2}>
        {goal.name}
      </Text>
      <Text>
        R$ {toCurrencyValue(goal.accumulated, true)} de R${' '}
        {toCurrencyValue(goal.cost)}
      </Text>
      <PercentageBar goal={goal.cost} value={goal.accumulated} />
      <Text mt="s42" preset="FS-16|LH-19" weight="semibold">
        Transações
      </Text>
      <Box mt="s10" mb="s16" height={1} bg="grey3" />
      <FlatList
        data={goalTransactions}
        renderItem={Transaction}
        keyExtractor={item => item.id}
        // eslint-disable-next-line react-native/no-inline-styles
        contentContainerStyle={{ gap: 12 }}
      />
      {goal.accumulated < goal.cost ? <ActionButton /> : <SuccessBox />}
    </Screen>
  )
}
