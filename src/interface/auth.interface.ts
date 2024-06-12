export interface ISignUp {
  email: string
  password: string
  lastName: string
  firstName: string
}

export interface ISignIn {
  email: string
  password: string
}

export interface IDataGenerateToken {
  userId: number
  firstName: string
  lastName: string
}
