import AsyncStorage from '@react-native-async-storage/async-storage'
import { FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app'
import { Auth, getAuth, getReactNativePersistence, initializeAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCZijf4WCOYgv-7x_Tu715RkPuMTtRQMkc',
  authDomain: 'noatum-app.firebaseapp.com',
  projectId: 'noatum-app',
  storageBucket: 'noatum-app.appspot.com',
  messagingSenderId: '470218412563',
  appId: '1:470218412563:web:0f8b71aeafc7be9e3225e6',
  measurementId: 'G-FNVD1F1MZC',
}

let app: FirebaseApp | undefined, auth: Auth | undefined

if (!getApps().length) {
  try {
    app = initializeApp(firebaseConfig)
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    })
  } catch (error) {
    console.log('Error initializing app: ' + error)
  }
} else {
  app = getApp()
  auth = getAuth(app)
}
export { app, auth, getApp, getAuth }
