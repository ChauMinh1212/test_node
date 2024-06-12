import { Router } from 'express'
import { body } from 'express-validator'
import { refreshToken, signIn, signOut, signUp } from '~/controller/auth.controller'
import { validateRequest } from '~/util/validation'

const authRoute = Router()

authRoute.post(
  '/sign-up',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').isLength({ min: 8, max: 20 }).withMessage('Password must be at least 8 characters long'),
    body('firstName').isString().withMessage('First name must be string'),
    body('lastName').isString().withMessage('Last name must be string')
  ],
  validateRequest,
  signUp
)

authRoute.post(
  '/sign-in',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').isLength({ min: 8, max: 20 }).withMessage('Password must be at least 8 characters long')
  ],
  validateRequest,
  signIn
)

authRoute.post(
  '/refresh-token',
  body('refreshToken').isJWT().withMessage('Token invalid'),
  validateRequest,
  refreshToken
)

authRoute.post(
  '/sign-out',
  signOut
)

export default authRoute
