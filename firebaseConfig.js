import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyCZijf4WCOYgv-7x_Tu715RkPuMTtRQMkc',
  authDomain: 'noatum-app.firebaseapp.com',
  projectId: 'noatum-app',
  storageBucket: 'noatum-app.appspot.com',
  messagingSenderId: '470218412563',
  appId: '1:470218412563:web:0f8b71aeafc7be9e3225e6',
  measurementId: 'G-FNVD1F1MZC',
}

const app = initializeApp(firebaseConfig)
export default app
