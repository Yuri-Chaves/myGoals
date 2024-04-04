import React from 'react'

import { Box, Icon, PressableBox, Text, TextInput } from '@components'

import { useForm } from '../context/useForm'
import { TTransaction } from '../FormTypes'

import { Button } from './Button'

export function AddTransactionForm() {
  const {
    transactionType,
    setTransactionType,
    transactionValue,
    setTransactionValue,
    errorType,
    fnOnTransactionAdd,
  } = useForm()

  return (
    <Box justifyContent="space-between" flex={1}>
      <Box gap="s16">
        <Box height={48} justifyContent="space-between">
          <Box flexDirection="row" gap="s10" alignItems="center">
            <TransactionButton
              type="deposit"
              transactionType={transactionType}
              setTransactionType={setTransactionType}
            />
            <TransactionButton
              type="withdrawal"
              transactionType={transactionType}
              setTransactionType={setTransactionType}
            />
          </Box>
          <Text
            marginLeft="s8"
            preset="FS-12|LH-14"
            color={errorType.transactionType ? 'red' : 'grey4'}>
            {errorType.transactionType ? 'Por favor selecione' : 'Selecione'} o
            tipo da transferência
          </Text>
        </Box>
        <TextInput
          defaultValue="000"
          label="Valor"
          value={transactionValue}
          onChangeText={setTransactionValue}
          mask="currency"
          keyboardType="number-pad"
          inError={errorType.transactionValue}
          errorMessage="Informe o valor da transferência"
          leftComponent={<Icon name="currency" color="grey4" />}
        />
      </Box>
      <Button title="CONFIRMAR" handlePress={fnOnTransactionAdd} />
    </Box>
  )
}

type TTransactionButton = {
  type: TTransaction
  transactionType: TTransaction
  setTransactionType: React.Dispatch<React.SetStateAction<TTransaction>>
}
function TransactionButton({
  type,
  transactionType,
  setTransactionType,
}: TTransactionButton) {
  function handlePress() {
    if (transactionType === type) {
      setTransactionType(undefined)
    } else {
      setTransactionType(type)
    }
  }

  return (
    <PressableBox
      flexDirection="row"
      alignItems="center"
      height={32}
      // eslint-disable-next-line react-native/no-inline-styles
      style={type === transactionType ? undefined : { opacity: 0.5 }}
      borderRadius="br5"
      paddingHorizontal="s8"
      backgroundColor="grey3"
      onPress={handlePress}>
      <Icon
        name={type === 'deposit' ? 'plus' : 'minus'}
        color={type === 'deposit' ? 'green' : 'red'}
      />
      <Text>{type === 'deposit' ? 'Depósito' : 'Saque'}</Text>
    </PressableBox>
  )
}
