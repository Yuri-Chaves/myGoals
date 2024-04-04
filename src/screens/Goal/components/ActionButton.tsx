import React from 'react'

import { Form, Text, TouchableOpacityBox } from '@components'

export function ActionButton() {
  return (
    <TouchableOpacityBox
      onPress={() => Form.expand('transaction')}
      backgroundColor="blue"
      height={48}
      borderRadius="br8"
      alignItems="center"
      mt="s16"
      justifyContent="center">
      <Text weight="semibold">NOVA TRANSAÇÃO</Text>
    </TouchableOpacityBox>
  )
}
