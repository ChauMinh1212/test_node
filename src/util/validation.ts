import { Request, Response, NextFunction } from 'express'
import { expressjwt } from 'express-jwt'
import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import { ExceptionResponse } from './exception'
import { BaseResponse } from './response'

const JWT_SECRET = process.env?.SECRET_KEY || 'secretKey'

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json(
      new BaseResponse({
        status: 400,
        message: errors
          .array()
          .map((item) => item.msg)
          .join(',')
      })
    )
  }
  next()
}

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1]
  if (!token) throw new ExceptionResponse(401, 'Token not found')

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      throw new ExceptionResponse(401, 'Invalid token')
    }
    req['user'] = decoded
    next()
  })
}

export const validationToken = expressjwt({
  secret: JWT_SECRET,
  algorithms: ['HS256']
})
