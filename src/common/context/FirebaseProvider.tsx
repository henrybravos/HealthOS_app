import { getFirestore } from 'firebase/firestore'
import { ReactElement } from 'react'

import { appFirebase } from '@common/config'

import { FirebaseContext } from './useFirebaseContext'

export const FirebaseAppProvider = ({ children }: { children: ReactElement }) => {
  const db = getFirestore(appFirebase)
  return (
    <FirebaseContext.Provider value={{ app: appFirebase, db }}>{children}</FirebaseContext.Provider>
  )
}
