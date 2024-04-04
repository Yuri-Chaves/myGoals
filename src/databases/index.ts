import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'

import GoalModel from './models/goalModel'
import TransactionModel from './models/transactionModel'
import { schemas } from './schemas'

const adapter = new SQLiteAdapter({
  schema: schemas,
})

export const database = new Database({
  adapter,
  modelClasses: [GoalModel, TransactionModel],
})

export type TGoalModel = GoalModel
export type TTransactionModel = TransactionModel
