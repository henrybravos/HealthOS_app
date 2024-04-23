import { createContext, useContext } from 'react'

import { useAuthentication } from '@common/hooks/useAuthentication'

type AppContext = ReturnType<typeof useAuthentication>
export const AppContext = createContext<AppContext | null>(null)

export const useAppContext = () => {
  const ctx = useContext(AppContext)
  if (!ctx) {
    throw new Error('should useAppContext in a AppProvider')
  }
  return ctx
}
