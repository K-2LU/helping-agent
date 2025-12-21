import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Occupation from './occupation.js'

export default class OccupationHistory extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({columnName: 'user_id'})
  declare userId: number

  @column({columnName: 'occupation_id'})
  declare occupationId: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Occupation)
  declare occupation: BelongsTo<typeof Occupation>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}