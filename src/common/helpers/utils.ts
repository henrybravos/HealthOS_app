import { Timestamp } from 'firebase/firestore'

export const convertDate = (date: Date) => {
  return Timestamp.fromDate(date)
}
