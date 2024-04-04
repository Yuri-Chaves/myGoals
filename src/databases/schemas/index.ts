import { appSchema } from '@nozbe/watermelondb'

import { goalSchema } from './goalSchema'
import { transactionSchema } from './transactionSchema'

export const schemas = appSchema({
  version: 991,
  tables: [goalSchema, transactionSchema],
})
