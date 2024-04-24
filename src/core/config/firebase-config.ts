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

const env = process.env

const firebaseConfig = {
  apiKey: env.EXPO_PUBLIC_API_KEY,
  authDomain: env.EXPO_PUBLIC_AUTH_DOMAIN,
  projectId: env.EXPO_PUBLIC_PROJECT_ID,
  storageBucket: env.EXPO_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
  appId: env.EXPO_PUBLIC_APP_ID,
  measurementId: env.EXPO_PUBLIC_MEASUREMENT_ID,
}
console.log('firebaseConfig: ', firebaseConfig)
let app: FirebaseApp | undefined,
  auth: Auth | undefined,
  db: Firestore | undefined,
  storage: FirebaseStorage | undefined

if (!getApps().length) {
  try {
    app = initializeApp(firebaseConfig)
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    })
    db = initializeFirestore(app, {})
    storage = getStorage(app)
  } catch (error) {
    console.log('Error initializing app: ' + error)
  }
} else {
  app = getApp()
  auth = getAuth(app)
  db = getFirestore(app!)
  storage = getStorage(app)
}
if (env.NODE_ENV === 'development') {
  //connectFirestoreEmulator(db!, '192.168.1.37', 8080)
  //connectAuthEmulator(auth!, 'http://192.168.1.37:9099', { disableWarnings: true })
}
export { app, auth, db, storage, getApp, getAuth }
