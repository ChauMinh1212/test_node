import { knex, Knex } from 'knex'
export const infoSql: Knex.Config = {
  client: 'mysql',
  connection: {
    host: process.env.MSSQL_HOST,
    port: +(process.env?.MSSQL_PORT || '5432'),
    user: process.env.MSSQL_USER,
    password: process.env.MSSQL_PASS,
    database: process.env.MSSQL_DB
  },
  migrations: {
    directory: './src/migration',
    extension: 'ts'
  },
  pool: {
    min: 2,
    max: 6,
    propagateCreateError: false
  }
}

export const DB = knex(infoSql)
