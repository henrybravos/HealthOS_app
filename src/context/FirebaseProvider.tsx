import { FirebaseApp } from 'firebase/app'
import { Firestore, getFirestore } from 'firebase/firestore'
import { ReactElement, createContext, useContext } from 'react'

import app from '../../firebaseConfig'

type FirebaseContextType = {
  app: FirebaseApp
  db: Firestore
}
const FirebaseContext = createContext<FirebaseContextType | null>(null)

const FirebaseAppProvider = ({ children }: { children: ReactElement }) => {
  const db = getFirestore(app)
  return <FirebaseContext.Provider value={{ app, db }}>{children}</FirebaseContext.Provider>
}
export const useFirebaseContext = () => {
  const ctx = useContext(FirebaseContext)
  if (!ctx) {
    throw new Error('should useFirebaseContext in a FirebaseAppProvider')
  }
  return ctx
}
export default FirebaseAppProvider
