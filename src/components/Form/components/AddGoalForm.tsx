import React, { useRef } from 'react'

import { Box, Icon, TextInput, TextInputRef } from '@components'

import { useForm } from '../context/useForm'

import { Button } from './Button'

export function AddGoalForm() {
  const {
    goalName,
    setGoalName,
    goalValue,
    setGoalValue,
    errorType,
    fnOnGoalAdd,
  } = useForm()

  const valueRef = useRef<TextInputRef>(null)

  return (
    <Box justifyContent="space-between" flex={1}>
      <Box gap="s16">
        <TextInput
          label="Nome da Meta"
          value={goalName}
          onChangeText={setGoalName}
          onEndEditing={() => valueRef.current?.handleFocus()}
          inError={errorType.goalName}
          errorMessage="Por favor informe o nome da meta"
          leftComponent={<Icon name="textbox" color="grey4" />}
        />
        <TextInput
          forwardRef={valueRef}
          defaultValue="000"
          label="Valor"
          value={goalValue}
          onChangeText={setGoalValue}
          mask="currency"
          keyboardType="number-pad"
          inError={errorType.goalValue}
          errorMessage="Por favor informe o valor da meta"
          leftComponent={<Icon name="currency" color="grey4" />}
        />
      </Box>
      <Button title="CRIAR" handlePress={fnOnGoalAdd} />
    </Box>
  )
}
