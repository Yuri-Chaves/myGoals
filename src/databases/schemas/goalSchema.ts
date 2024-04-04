import { tableSchema } from '@nozbe/watermelondb'

export const goalSchema = tableSchema({
  name: 'goals',
  columns: [
    { name: 'name', type: 'string' },
    { name: 'accumulated', type: 'number' },
    { name: 'cost', type: 'number' },
  ],
})
