import { Router } from 'express'
import { body } from 'express-validator'
import { refreshToken, signIn, signOut, signUp } from '~/controller/auth.controller'
import { validateRequest } from '~/util/validation'

const authRoute = Router()

/**
 * @swagger
 * tags:
 *   name: Auth
 */

/**
 * @swagger
 * /sign-up:
 *   post:
 *     summary: Register
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: The user's name
 *                 example: John Doe
 *               lastName:
 *                 type: string
 *                 description: The user's name
 *                 example: John Doe
 *               password:
 *                 type: string
 *                 description: The password
 *                 example: admin123
 *               email:
 *                 type: string
 *                 description: The user's email
 *                 example: john.doe@example.com
 *     responses:
 *       201:
 *         description: register successful
 *         content:
 *           application/json:
 *             schema:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The user ID
 *                     example: 1
 *                   firstName:
 *                     type: string
 *                     description: The user's name
 *                     example: John Doe
 *                   lastName:
 *                     type: string
 *                     description: The user's name
 *                     example: John Doe
 *                   email:
 *                     type: string
 *                     description: The user's mail
 *                     example: John Doe
 *                   displayName:
 *                     type: string
 *                     description: The user's name
 *                     example: John Doe
 */
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

/**
 * @swagger
 * /sign-in:
 *   post:
 *     summary: Login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 description: The password
 *                 example: admin123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The user ID
 *                       example: 1
 *                     firstName:
 *                       type: string
 *                       description: The user's first name
 *                       example: John
 *                     lastName:
 *                       type: string
 *                       description: The user's last name
 *                       example: Doe
 *                     email:
 *                       type: string
 *                       description: The user's email
 *                       example: john.doe@example.com
 *                     displayName:
 *                       type: string
 *                       description: The user's display name
 *                       example: John Doe
 *                 token:
 *                   type: string
 *                   description: accessToken
 *                   example: eyskljdqwiej
 *                 refreshToken:
 *                   type: string
 *                   description: refreshToken
 *                   example: eyskljdqwiej
 */
authRoute.post(
  '/sign-in',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').isLength({ min: 8, max: 20 }).withMessage('Password must be at least 8 characters long')
  ],
  validateRequest,
  signIn
)

/**
 * @swagger
 * /refresh-token:
 *   post:
 *     summary: Refresh token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: The refresh token
 *                 example: eymksldjqkwle
 *     responses:
 *       200:
 *         description: Refresh token successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Access token
 *                   example: eylksdklqweqwe
 *                 refreshToken:
 *                   type: string
 *                   description: Refresh token
 *                   example: eylksdklqweqwe
 */
authRoute.post(
  '/refresh-token',
  body('refreshToken').isJWT().withMessage('Token invalid'),
  validateRequest,
  refreshToken
)

/**
 * @swagger
 * /sign-out:
 *   post:
 *     summary: Sign out
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Sign out successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 */
authRoute.post('/sign-out', signOut)

export default authRoute
