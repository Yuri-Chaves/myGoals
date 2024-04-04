import React, { createContext, useState } from 'react'
import { Alert } from 'react-native'

import { TGoalModel, TTransactionModel, database } from '@databases'
import { Q } from '@nozbe/watermelondb'
import { currencyStringToNumber, toCurrencyValue } from '@utils'

import { useDBProvider } from '@services'

import { ErrorTypes, FormContextProps, TTransaction } from '../FormTypes'

export const FormContext = createContext<FormContextProps>(
  {} as FormContextProps,
)

interface Props {
  fnOnSuccess: () => void
  goal: TGoalModel | undefined
}

export function FormProvider({
  children,
  fnOnSuccess,
  goal,
}: React.PropsWithChildren<Props>) {
  const {
    fetchGoals,
    fetchGoalTransactions,
    fetchTransactions,
    goal: DBGoal,
  } = useDBProvider()

  const [goalName, setGoalName] = useState<string>(goal?.name || '')
  const [goalValue, setGoalValue] = useState<string>(
    toCurrencyValue(goal?.cost || ''),
  )

  const [transactionType, setTransactionType] =
    useState<TTransaction>(undefined)
  const [transactionValue, setTransactionValue] = useState<string>('')

  const [errorType, setErrorType] = useState<ErrorTypes>({
    goalName: false,
    goalValue: false,
    transactionType: false,
    transactionValue: false,
  })

  function Clear() {
    setGoalName('')
    setGoalValue('')
    setTransactionType(undefined)
    setTransactionValue('')
    setErrorType({
      goalName: false,
      goalValue: false,
      transactionType: false,
      transactionValue: false,
    })
  }

  function EndFNs() {
    fnOnSuccess()
    Clear()
  }

  async function fnOnGoalAdd() {
    if (goalName === '' || goalValue === '') {
      if (goalName === '') {
        setErrorType(prev => {
          return { ...prev, goalName: true }
        })
      }
      if (goalValue === '') {
        setErrorType(prev => {
          return { ...prev, goalValue: true }
        })
      }
      return
    }
    await database.write(async () => {
      await database.get<TGoalModel>('goals').create(data => {
        ;(data.name = goalName),
          (data.accumulated = 0),
          (data.cost = parseInt(goalValue.replace(/\D/g, ''), 10))
      })
    })
    EndFNs()
    fetchGoals()
  }

  async function fnOnTransactionAdd() {
    if (transactionType === undefined || transactionValue === '') {
      if (transactionType === undefined) {
        setErrorType(prev => {
          return { ...prev, transactionType: true }
        })
      }
      if (transactionValue === '') {
        setErrorType(prev => {
          return { ...prev, transactionValue: true }
        })
      }
      return
    }
    if (DBGoal) {
      const value = currencyStringToNumber(transactionValue)
      if (transactionType === 'withdrawal' && value > DBGoal.accumulated) {
        setTransactionValue('')
        Alert.alert(
          'Não é possível realizar o saque',
          'Valor de saque maior que valor acumulado do objetivo',
        )
        return
      }
      if (transactionType === 'deposit' && value > DBGoal.cost) {
        setTransactionValue('')
        Alert.alert(
          'Não é possível realizar o depósito',
          'Valor de depósito maior que valor do objetivo',
        )
        return
      }
      await database.write(async () => {
        await DBGoal.update(data => {
          data.accumulated =
            transactionType === 'deposit'
              ? data.accumulated + value
              : data.accumulated - value
        })
      })
      await database.write(async () => {
        await database.get<TTransactionModel>('transactions').create(data => {
          ;(data.type = transactionType),
            (data.value = transactionValue.replace(/\D/g, ''))
          data.date = new Date().toLocaleDateString()
          ;(data.goal_id = DBGoal.id), (data.goalName = DBGoal.name)
        })
      })
    }
    EndFNs()
    fetchGoalTransactions()
  }

  async function fnOnDelete() {
    if (goal) {
      await database.write(async () => {
        const transactionCollection =
          database.get<TTransactionModel>('transactions')
        const transactions = await transactionCollection
          .query(Q.where('goal_id', Q.eq(goal.id)))
          .fetch()
        await transactions.map(transaction => transaction.destroyPermanently())
      })
      await database.write(async () => {
        await goal.destroyPermanently()
      })
      EndFNs()
      fetchGoals()
      fetchTransactions()
    }
  }

  async function fnOnEdit() {
    if (goal) {
      await database.write(async () => {
        const transactions = await database
          .get<TTransactionModel>('transactions')
          .query(Q.where('goal_id', Q.eq(goal.id)))
          .fetch()
        await transactions.map(transaction =>
          transaction.update(data => {
            data.goalName = goalName
          }),
        )
        await goal.update(data => {
          ;(data.name = goalName),
            (data.cost = currencyStringToNumber(goalValue)),
            (data.accumulated = goal.accumulated)
        })
      })
      EndFNs()
      fetchGoals()
      fetchTransactions()
    }
  }

  return (
    <FormContext.Provider
      value={{
        goal,

        goalName,
        setGoalName,
        goalValue,
        setGoalValue,

        transactionType,
        setTransactionType,
        transactionValue,
        setTransactionValue,

        errorType,
        setErrorType,

        Clear,

        fnOnGoalAdd,
        fnOnTransactionAdd,
        fnOnDelete,
        fnOnEdit,
      }}>
      {children}
    </FormContext.Provider>
  )
}
