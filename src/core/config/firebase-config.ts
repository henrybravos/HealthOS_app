import AsyncStorage from '@react-native-async-storage/async-storage'
import { FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app'
import {
  Auth,
  connectAuthEmulator,
  getAuth,
  getReactNativePersistence,
  initializeAuth,
} from 'firebase/auth'
import {
  Firestore,
  connectFirestoreEmulator,
  getFirestore,
  initializeFirestore,
} from 'firebase/firestore'
import { FirebaseStorage, getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_MEASUREMENT_ID,
}
console.log('firebaseConfig: ', firebaseConfig)
let app: FirebaseApp | undefined,
  auth: Auth | undefined,
  db: Firestore | undefined,
  storage: FirebaseStorage | undefined

const configureFirebase = () => {
  if (!getApps().length) {
    try {
      app = initializeApp(firebaseConfig)
      auth = initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage),
      })
      db = initializeFirestore(app, {})
      storage = getStorage(app)
      if (process.env.NODE_ENV === 'development') {
        connectFirestoreEmulator(db!, process.env.EXPO_PUBLIC_SERVER_LOCAL || '', 8080)
        connectAuthEmulator(auth!, `http://${process.env.EXPO_PUBLIC_SERVER_LOCAL}:9099`, {
          disableWarnings: true,
        })
      }
    } catch (error) {
      console.log('Error initializing app: ' + error)
    }
  } else {
    app = getApp()
    auth = getAuth(app)
    db = getFirestore(app)
    storage = getStorage(app)
  }

  return { app, auth, db, storage, getApp, getAuth }
}

export { configureFirebase }
