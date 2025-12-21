import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table.string('phone_number')
      table.string('password')
      table.string('img_url')
      table.boolean('verified')
      table.string('location')
      table.timestamp('created_at', {useTz: true})
      table.timestamp('updated_at', {useTz: true})
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}