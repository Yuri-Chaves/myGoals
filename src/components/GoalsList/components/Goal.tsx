import React from 'react'
import { ListRenderItemInfo } from 'react-native'

import { TGoalModel } from '@databases'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { toCurrencyValue } from '@utils'

import { Box, Form, Text, TouchableOpacityBox } from '@components'
import { AppScreensParamList } from '@routes'

import { Percentage } from './Percentage'

interface Props extends ListRenderItemInfo<TGoalModel> {
  navigation: NativeStackNavigationProp<AppScreensParamList>
  fnOnPress: () => void
}

export function Goal({ item, navigation, fnOnPress }: Props) {
  async function handlePress() {
    await fnOnPress()
    navigation.navigate('Goal')
  }

  return (
    <TouchableOpacityBox
      width={148}
      height={164}
      backgroundColor="grey2"
      borderRadius="br10"
      padding="s16"
      justifyContent="space-between"
      onPress={handlePress}
      onLongPress={() => Form.expand('goal', item)}
      activeOpacity={1}>
      <Box>
        <Text preset="FS-16|LH-22" weight="bold" mb="s16" numberOfLines={1}>
          {item.name}
        </Text>
        <Text weight="semibold">
          R$ {toCurrencyValue(item.accumulated, true)}
        </Text>
        <Text color="grey4">de R$ {toCurrencyValue(item.cost)}</Text>
      </Box>
      <Percentage goal={item.cost} value={item.accumulated} />
    </TouchableOpacityBox>
  )
}
