import { Dispatch, SetStateAction } from 'react'

import { TGoalModel, TTransactionModel } from '@databases'

export interface DBContextProps {
  goals: Array<TGoalModel>
  transactions: Array<TTransactionModel>
  goal: TGoalModel | undefined
  setGoal: Dispatch<SetStateAction<TGoalModel | undefined>>
  goalTransactions: Array<TTransactionModel>
  fetchGoals: () => void
  fetchTransactions: () => void
  fetchGoalTransactions: () => void
}
