import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import moment from 'moment'
import { DB } from '~/config/db.config'
import { IDataGenerateToken, ISignIn, ISignUp } from '~/interface/auth.interface'
import { ExceptionResponse } from '~/util/exception'

const JWT_SECRET = process.env?.SECRET_KEY || 'secretKey'

export const signUpService = async (body: ISignUp) => {
  //Check user exist
  const user = (await DB.table('user').where({ email: body.email }))[0]
  if (user) throw new ExceptionResponse(400, 'User exist')

  //Hash pass
  const saltRounds = 10
  const hash = await bcrypt.hash(body.password, saltRounds)

  //Create new user
  const newUser = await DB.table('user').insert({
    email: body.email,
    firstName: body.firstName,
    lastName: body.lastName,
    hash
  })

  return {
    id: newUser[0],
    email: body.email,
    firstName: body.firstName,
    lastName: body.lastName,
    displayName: body.firstName + ' ' + body.lastName
  }
}

export const signInService = async (body: ISignIn) => {
  //Check user exist
  const user = (await DB.table('user').where({ email: body.email }))[0]
  if (!user) throw new ExceptionResponse(400, 'User not exist')

  //Check pass
  const compare = await bcrypt.compare(body.password, user.hash)
  if (!compare) throw new ExceptionResponse(400, 'Pass wrong')

  //Gen token
  const { accessToken, refreshToken } = generateToken({
    userId: user.id,
    firstName: user.firstName,
    lastName: user.lastName
  })

  //insert db
  await DB.table('token').insert({
    userId: user.id,
    refreshToken,
    expiresIn: moment().add(30, 'day').format('YYYY-MM-DD HH:mm:ss')
  })

  return {
    user: {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      displayName: user.firstName + ' ' + user.lastName
    },
    token: accessToken,
    refreshToken
  }
}

export const signOutService = async () => {
  await DB.table('token').delete()
}

export const refreshTokenService = async (body: any) => {
  //Check token exxist in db
  const oldRefreshToken = (await DB.table('token').where({ refreshToken: body.refreshToken }))[0]
  if (!oldRefreshToken) throw new ExceptionResponse(404, 'Token not found')

  //verify and gen new token
  const user = jwt.verify(body.refreshToken, JWT_SECRET) as IDataGenerateToken
  const { accessToken, refreshToken } = generateToken({
    userId: user['userId'],
    firstName: user['firstName'],
    lastName: user['lastName']
  })

  //Update db
  await DB.table('token').where({ id: oldRefreshToken.id }).update({ refreshToken: refreshToken })

  return {
    token: accessToken,
    refreshToken: refreshToken
  }
}

const generateToken = (data: IDataGenerateToken) => ({
  accessToken: jwt.sign(data, JWT_SECRET, { expiresIn: '1h' }),
  refreshToken: jwt.sign(data, JWT_SECRET, { expiresIn: '30d' })
})
