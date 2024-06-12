import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import { DB } from './config/db.config'
import routes from './routes/index'
import { errorMiddleware } from './util/exception'

async function main() {
  const app = express()
  const port = process.env?.PORT ? +process.env?.PORT : 3000

  app.use(bodyParser.json())
  app.use(cors())

  app.use('/', routes)
  app.use(errorMiddleware)

  //Check connect DB and create table
  await DB.raw('select 1+1 as result')
  await DB.migrate.latest()

  app.listen(port, () => console.log(`Server start at port ${port}`))
}

main()
