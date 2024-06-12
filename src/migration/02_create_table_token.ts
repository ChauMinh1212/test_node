import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  const exist = await knex.schema.hasTable('token')
  if (!exist) {
    await knex.schema.createTableIfNotExists('token', (table) => {
      table.increments('id').primary()
      table.integer('userId').unsigned().notNullable().references('id').inTable('user').onDelete('CASCADE')
      table.string('refreshToken', 250).notNullable()
      table.string('expiresIn', 64).notNullable()
      table.datetime('updatedAt').defaultTo(knex.fn.now())
      table.datetime('createdAt').defaultTo(knex.fn.now())
    })
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('token')
}
