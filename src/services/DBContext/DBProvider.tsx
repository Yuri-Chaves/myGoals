import React, { createContext, useEffect, useState } from 'react'

import { TGoalModel, TTransactionModel, database } from '@databases'
import { Q } from '@nozbe/watermelondb'

import { DBContextProps } from './DBProviderType'

export const DBContext = createContext({} as DBContextProps)

export function DBProvider({ children }: React.PropsWithChildren<{}>) {
  const [goals, setGoals] = useState<Array<TGoalModel>>([])
  const [goal, setGoal] = useState<TGoalModel | undefined>(undefined)
  const [transactions, setTransactions] = useState<Array<TTransactionModel>>([])
  const [goalTransactions, setGoalTransactions] = useState<
    Array<TTransactionModel>
  >([])

  useEffect(() => {
    console.log('DBProvider\n', goal)
  }, [goal])

  async function fetchGoals() {
    const goalCollection = database.get<TGoalModel>('goals')
    const response = await goalCollection.query().fetch()
    setGoals(response)
  }

  async function fetchTransactions() {
    const transactionCollection =
      database.get<TTransactionModel>('transactions')
    const response = await transactionCollection.query().fetch()
    setTransactions(response)
  }

  async function fetchGoalTransactions() {
    if (goal) {
      const goalTransactionCollection =
        database.get<TTransactionModel>('transactions')
      const response = await goalTransactionCollection
        .query(Q.where('goal_id', Q.eq(goal.id)))
        .fetch()
      setGoalTransactions(response)
    }
  }

  useEffect(() => {
    fetchGoals()
    fetchTransactions()
  }, [])

  return (
    <DBContext.Provider
      value={{
        goals,
        transactions,

        goal,
        setGoal,
        goalTransactions,

        fetchGoals,
        fetchTransactions,
        fetchGoalTransactions,
      }}>
      {children}
    </DBContext.Provider>
  )
}
