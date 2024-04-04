import React, { useEffect, useRef } from 'react'

import { toCurrencyValue } from '@utils'

import { Box, Icon, TextInput, TextInputRef } from '@components'

import { useForm } from '../context/useForm'

import { Button } from './Button'

export function EditGoalForm() {
  const {
    goalName,
    setGoalName,
    goalValue,
    setGoalValue,
    errorType,
    goal,
    fnOnDelete,
    fnOnEdit,
  } = useForm()

  const valueRef = useRef<TextInputRef>(null)

  useEffect(() => {
    if (goal) {
      setGoalName(goal?.name || '')
      setGoalValue(toCurrencyValue(goal?.cost || ''))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goal])

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
          leftComponent={<Icon name="renameOutline" color="grey4" />}
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
      <Box flexDirection="row" gap="s16">
        <Button
          title="EXCLUIR"
          handlePress={fnOnDelete}
          color="red"
          buttonProps={{ flex: 1 }}
        />
        <Button
          title="EDITAR"
          handlePress={fnOnEdit}
          buttonProps={{ flex: 1 }}
        />
      </Box>
    </Box>
  )
}
