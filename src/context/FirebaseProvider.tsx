import { FirebaseApp } from 'firebase/app'
import { ReactElement, createContext, useContext } from 'react'

import app from '../../firebaseConfig'

const FirebaseContext = createContext<FirebaseApp | null>(null)

const FirebaseAppProvider = ({ children }: { children: ReactElement }) => {
  return <FirebaseContext.Provider value={app}>{children}</FirebaseContext.Provider>
}
export const useFirebaseContext = () => {
  const ctx = useContext(FirebaseContext)
  if (!ctx) {
    throw new Error('should useFirebaseContext in a FirebaseAppProvider')
  }
  return ctx
}
export default FirebaseAppProvider
