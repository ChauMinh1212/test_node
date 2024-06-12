import { NextFunction, Response, Request } from 'express'

export class ExceptionResponse {
  status: number
  data: any
  message: string

  constructor(status = 400, message = 'Dữ liệu không hợp lệ!', data = null) {
    this.status = status
    this.message = message
    this.data = data
  }
}

export function errorMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
  if (err instanceof ExceptionResponse) {
    res.status(err.status).json({
      status: err.status,
      message: err.message,
      data: err.data
    })
  } else if (err.name == 'UnauthorizedError') {
    res.status(401).json({
      status: 401,
      message: 'Invalid token',
      data: null
    })
  } else {
    res.status(400).json({
      status: 400,
      message: err.message,
      data: null
    })
  }
}
