import { createContext, useContext } from 'react'

import { User, UserInfo } from '@core/types'

type AppContextType = {
  userAuth?: User
  isAuthenticating: boolean
  loadingAuth: boolean
  userExtra?: UserInfo
  handleSignOut: () => void
}
export const AppContext = createContext<AppContextType | null>(null)

export const useAppContext = () => {
  const ctx = useContext(AppContext)
  if (!ctx) {
    throw new Error('should useAppContext in a AppProvider')
  }
  return ctx
}
