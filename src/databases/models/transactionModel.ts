import { Model } from '@nozbe/watermelondb'
import { field } from '@nozbe/watermelondb/decorators'

export default class TransactionModel extends Model {
  static table = 'transactions'

  @field('type')
  type!: string

  @field('goal_name')
  goalName!: string

  @field('goal_id')
  goal_id!: string

  @field('value')
  value!: string

  @field('date')
  date!: string
}
