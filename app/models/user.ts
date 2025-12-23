import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import OccupationHistory from './occupation_history.js'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Occupation from './occupation.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['phone_number'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare phoneNumber: string

  @column({ serializeAs: null })
  declare password: string

  @column({columnName: 'img_url'})
  declare imgUrl: string | null;

  @column()
  declare verified: boolean;

  @column()
  declare location: string;

  @manyToMany(() => Occupation, {
    pivotTable: 'occupation_histories',
    pivotTimestamps: true,
    pivotColumns: ['starting_date', 'ending_date'],
  })
  
  declare occupations: ManyToMany<typeof Occupation>

  @hasMany(() => OccupationHistory)
  declare occupationHistory: HasMany<typeof OccupationHistory>

  @column.dateTime({ columnName: 'created_at', autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ columnName: 'updated_at', autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  static accessTokens = DbAccessTokensProvider.forModel(User, {
    expiresIn: '7 days',
    prefix: 'work_',
    table: 'auth_access_tokens',
    type: 'auth_token',
    tokenSecretLength: 40,
  })
}