import { ReactElement } from 'react'

import { useAuthentication } from '@common/hooks/useAuthentication'

import { AppContext } from './useAppContext'

export const AppProvider = ({ children }: { children: ReactElement }) => {
  const auth = useAuthentication()
  return <AppContext.Provider value={auth}>{children}</AppContext.Provider>
}
