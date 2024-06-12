import { NextFunction, Request, Response } from 'express'
import { ISignIn, ISignUp } from '~/interface/auth.interface'
import { refreshTokenService, signInService, signOutService, signUpService } from '~/service/auth.service'
import { BaseResponse } from '~/util/response'

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body: ISignUp = req.body
    const data = await signUpService(body)
    return res.status(201).send(new BaseResponse({ status: 201, data }))
  } catch (e) {
    next(e)
  }
}

export const signIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body: ISignIn = req.body
    const data = await signInService(body)
    return res.status(200).send(new BaseResponse({ status: 200, data }))
  } catch (e) {
    next(e)
  }
}

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await refreshTokenService(req.body)
    return res.status(200).send(new BaseResponse({ status: 200, data }))
  } catch (e) {
    next(e)
  }
}

export const signOut = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await signOutService()
    return res.status(200).send(new BaseResponse({}))
  } catch (e) {
    next(e)
  }
}
