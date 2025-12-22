import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'otps'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE')
      table.string('otp').notNullable()
      table.enum('purpose', ['verification','reset']).notNullable()
      table.timestamp('expires_at').notNullable();

      table.timestamp('created_at', {useTz: true})
      table.timestamp('updated_at', {useTz: true})
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}