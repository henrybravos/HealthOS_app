import { FirebaseApp } from 'firebase/app'
import { Firestore } from 'firebase/firestore'
import { createContext, useContext } from 'react'

import { User, UserInfo } from '@core/types'

type FirebaseContextType = {
  app: FirebaseApp
  db: Firestore
  userAuth?: User
  isAuthenticating: boolean
  loadingAuth: boolean
  userExtra?: UserInfo
  handleSignOut: () => void
}
export const FirebaseContext = createContext<FirebaseContextType | null>(null)

export const useFirebaseContext = () => {
  const ctx = useContext(FirebaseContext)
  if (!ctx) {
    throw new Error('should useFirebaseContext in a FirebaseAppProvider')
  }
  return ctx
}
