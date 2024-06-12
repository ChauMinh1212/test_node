export interface UserModel {
  id?: number
  email: string
  firstName: string
  lastName: string
  hash: string
  updatedAt?: Date | string
  createdAt?: Date | string
}

export interface TokenModel {
  id?: number
  userId: number
  refreshToken: string
  expiresIn: string
  updatedAt?: Date | string
  createdAt?: Date | string
}
