import { onAuthStateChanged } from 'firebase/auth'
import { ReactElement, useEffect, useState } from 'react'

import { auth } from '@common/config'
import { useFetchApi } from '@common/hooks'

import { AuthService } from '@core/services'
import { User, UserInfo } from '@core/types'

import { AppContext } from './useAppContext'

export const AppProvider = ({ children }: { children: ReactElement }) => {
  const [userAuth, setUserAuth] = useState<User | undefined>(undefined)
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined)
  const [loadingExtra, setLoadingExtra] = useState(false)
  const [_, __, fetchSignOut] = useFetchApi(AuthService.signOut)

  const [loadingAuth, setLoadingAuth] = useState(true)
  useEffect(() => {
    if (auth) {
      setLoadingAuth(true)
      onAuthStateChanged(auth, (user: any) => {
        if (user) {
          const auth = {
            email: user.email || '',
            token: user.stsTokenManager?.accessToken || '',
            refreshToken: user.stsTokenManager?.refreshToken || '',
            expirationTime: user.stsTokenManager?.expirationTime || 0,
          }
          setUserAuth({
            auth,
            id: user.uid,
            displayName: user.displayName || '',
          })
          getDataExtra(user.uid)
        } else {
          setUserAuth(undefined)
          handleSignOut()
        }
        setTimeout(() => {
          setLoadingAuth(false)
        }, 10)
      })
    }
  }, [])
  const getDataExtra = async (id: string) => {
    setLoadingExtra(true)
    const extra = await AuthService.getExtraData({ uuid: id })
    setLoadingExtra(false)
    if (extra) {
      setUserInfo(extra)
    } else {
      handleSignOut()
      setUserInfo(undefined)
    }
  }
  const handleSignOut = () => {
    fetchSignOut()
    setUserInfo(undefined)
  }

  return (
    <AppContext.Provider
      value={{
        loadingAuth: loadingAuth || loadingExtra,
        isAuthenticating: !!userAuth?.id,
        userAuth: userAuth,
        userExtra: userInfo,
        handleSignOut,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
