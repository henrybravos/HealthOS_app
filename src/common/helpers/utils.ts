import { Timestamp } from 'firebase/firestore'

export const convertDate = (date: Date) => {
  return Timestamp.fromDate(date)
}

export const generateId = (): string => {
  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let autoId = ''
  for (let i = 0; i < 20; i++) {
    autoId += CHARS.charAt(Math.floor(Math.random() * CHARS.length))
  }
  return autoId
}
export const getExtensionFromUri = (uri: string) => {
  const parts = uri.split('.')
  return parts[parts.length - 1]
}
