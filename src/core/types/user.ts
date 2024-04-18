export type Auth = {
  user: string
  password: string
}
export type User = {
  id: string
  name: string
  surname: string
  email: string
  auth: Auth
}
