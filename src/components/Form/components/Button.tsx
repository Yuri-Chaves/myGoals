import React from 'react'

import { Text, TouchableOpacityBox, TouchableOpacityProps } from '@components'
import { ThemeColors } from '@theme'

import { useForm } from '../context/useForm'

interface Props {
  title: 'EDITAR' | 'CRIAR' | 'CONFIRMAR' | 'EXCLUIR'
  handlePress: () => void
  color?: ThemeColors
  buttonProps?: TouchableOpacityProps
}

export function Button({
  handlePress,
  title,
  color = 'blue',
  buttonProps,
}: Props) {
  const { errorType } = useForm()

  const marginBottom: TouchableOpacityProps['mt'] =
    errorType.goalName && errorType.goalValue ? 's16' : 's24'

  return (
    <TouchableOpacityBox
      {...buttonProps}
      mb={marginBottom}
      backgroundColor={color}
      height={48}
      borderRadius="br8"
      alignItems="center"
      justifyContent="center"
      onPress={handlePress}>
      <Text weight="semibold">{title}</Text>
    </TouchableOpacityBox>
  )
}
