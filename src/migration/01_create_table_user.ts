import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  const exist = await knex.schema.hasTable('user')
  if (!exist) {
    await knex.schema.createTable('user', (table) => {
      table.increments('id').primary()
      table.string('firstName', 32).notNullable()
      table.string('lastName', 32).notNullable()
      table.string('email', 64).notNullable()
      table.string('hash', 255).notNullable()
      table.datetime('updatedAt').defaultTo(knex.fn.now())
      table.datetime('createdAt').defaultTo(knex.fn.now())
    })
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('user')
}
