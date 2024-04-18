import { FirebaseApp } from 'firebase/app'
import { Firestore } from 'firebase/firestore'
import { createContext, useContext } from 'react'

type FirebaseContextType = {
  app: FirebaseApp
  db: Firestore
}
export const FirebaseContext = createContext<FirebaseContextType | null>(null)

export const useFirebaseContext = () => {
  const ctx = useContext(FirebaseContext)
  if (!ctx) {
    throw new Error('should useFirebaseContext in a FirebaseAppProvider')
  }
  return ctx
}
