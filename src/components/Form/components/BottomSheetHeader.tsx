import React from 'react'

import { Box, Icon, Text } from '@components'

import { useForm } from '../context/useForm'
import { FormType } from '../FormTypes'

interface Props {
  formType: FormType
  onRequestClose: () => void
}
export function BottomSheetHeader({ formType, onRequestClose }: Props) {
  const { Clear, goal } = useForm()

  function handleClose() {
    Clear()
    onRequestClose()
  }
  return (
    <Box
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      mb="s24">
      <Text preset="FS-20|LH-24" weight="semibold" numberOfLines={1}>
        {goal
          ? `Editar: ${goal.name}`
          : `Nova ${formType === 'goal' ? 'meta' : 'transação'}`}
      </Text>
      <Icon name="close" size={30} onPress={handleClose} />
    </Box>
  )
}
