import { tableSchema } from '@nozbe/watermelondb'

export const transactionSchema = tableSchema({
  name: 'transactions',
  columns: [
    { name: 'type', type: 'string' },
    { name: 'goal_id', type: 'string' },
    { name: 'goal_name', type: 'string' },
    { name: 'value', type: 'string' },
    { name: 'date', type: 'string' },
  ],
})
