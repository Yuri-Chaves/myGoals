import { Model } from '@nozbe/watermelondb'
import { field } from '@nozbe/watermelondb/decorators'

export default class GoalModel extends Model {
  static table = 'goals'

  @field('name')
  name!: string

  @field('accumulated')
  accumulated!: number

  @field('cost')
  cost!: number
}
