import { Dispatch, SetStateAction } from 'react'

import { TGoalModel } from '@databases'

export type FormType = 'goal' | 'transaction'

export type TTransaction = 'deposit' | 'withdrawal' | undefined

export type ErrorTypes = {
  goalName: boolean
  goalValue: boolean
  transactionType: boolean
  transactionValue: boolean
}

export interface FormContextProps {
  goal: TGoalModel | undefined

  goalName: string
  setGoalName: Dispatch<SetStateAction<string>>
  goalValue: string
  setGoalValue: Dispatch<SetStateAction<string>>
  transactionType: TTransaction
  setTransactionType: Dispatch<SetStateAction<TTransaction>>
  transactionValue: string
  setTransactionValue: Dispatch<SetStateAction<string>>

  errorType: ErrorTypes
  setErrorType: Dispatch<SetStateAction<ErrorTypes>>

  Clear: () => void

  fnOnGoalAdd: () => void
  fnOnTransactionAdd: () => void
  fnOnDelete: () => void
  fnOnEdit: () => void
}
