import { Occupation } from '@core/types/occupations'

export type Auth = {
  email: string
  token: string
  refreshToken: string
  expirationTime: number
}
export type User = {
  id: string
  displayName: string
  auth: Auth
}
export type UserInfo = {
  id: string
  name: string
  email: string
  surname: string
  phone: string
  address: string
  occupation: Occupation
}
