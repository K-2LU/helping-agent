import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Occupation extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare details: string

  @column()
  declare createdBy: number

  @belongsTo(() => User, {
    foreignKey: 'createdBy',
  })
  declare author: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}