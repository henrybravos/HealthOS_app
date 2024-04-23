import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'

import { auth } from '@common/config'
import useFetchApi from '@common/hooks/useFetchApi'

import { AuthService } from '@core/services'
import { User, UserInfo } from '@core/types'

const useAuthentication = () => {
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
  const getDataExtra = async (authId: string) => {
    setLoadingExtra(true)
    const extra = await AuthService.getExtraData({ authId })
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
  return {
    userAuth,
    isAuthenticating: !!userAuth?.id,
    isLoading: loadingAuth || loadingExtra,
    userExtra: userInfo,
    handleSignOut,
  }
}
export { useAuthentication }
