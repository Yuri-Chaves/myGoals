import React from 'react'
import { FlatList } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { useAppTheme } from '@hooks'
import { AppScreensParamList } from '@routes'
import { useDBProvider } from '@services'

import { Box, TouchableOpacityBox } from '../Box/Box'
import { Icon } from '../Icon/Icon'
import { DEFAULT_PADDING_HORIZONTAL } from '../Screen/Screen'
import { Text } from '../Text/Text'

import { Goal } from './components/Goal'

interface GoalProps {
  onPressAdd: () => void
}

export function GoalsList({ onPressAdd }: GoalProps) {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppScreensParamList>>()

  const { goals, setGoal } = useDBProvider()

  const { spacing } = useAppTheme()
  return goals.length > 0 ? (
    <Box flexDirection="row">
      <TouchableOpacityBox
        onPress={onPressAdd}
        width={64}
        height={164}
        mr="s16"
        backgroundColor="green"
        borderRadius="br10"
        alignItems="center"
        justifyContent="center">
        <Icon name="plus" size={36} color="black" />
      </TouchableOpacityBox>
      <FlatList
        horizontal
        contentContainerStyle={{
          paddingRight: spacing.s24,
          gap: spacing.s16,
        }}
        keyExtractor={item => item.id}
        data={goals}
        renderItem={item =>
          Goal({
            ...item,
            navigation: navigation,
            fnOnPress() {
              setGoal(item.item)
            },
          })
        }
      />
    </Box>
  ) : (
    <TouchableOpacityBox
      height={164}
      backgroundColor="grey2"
      borderRadius="br10"
      alignItems="center"
      paddingHorizontal="s16"
      justifyContent="center"
      onPress={onPressAdd}
      marginRight={DEFAULT_PADDING_HORIZONTAL}>
      <Text preset="FS-20|LH-24" textAlign="center" weight="bold">
        Cadastrar objetivo
      </Text>
      <Icon name="plus" color="green" size={42} />
      <Text textAlign="center">Você não possui nenhum objetivo cadastrado</Text>
    </TouchableOpacityBox>
  )
}
