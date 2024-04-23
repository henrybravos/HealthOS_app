import { useNavigation } from '@react-navigation/native'
import { useCallback, useEffect, useState } from 'react'

import * as regex from '@common/helpers/regex'
import { useAppContext } from '@common/context'
import { useFetchApi } from '@common/hooks'

import { AuthService } from '@core/services'

import { SCREENS, StackNavigation } from '@navigation/navigation.types'

const initAuth = {
  email: '',
  password: '',
  invalidEmail: true,
  invalidPassword: true,
}

export const useAuth = () => {
  const { isAuthenticating } = useAppContext()
  const navigation = useNavigation<StackNavigation>()
  const [authInput, setAuthInput] = useState(initAuth)
  const [loadingSignIn, authResponse, fetchLogin, errorSignIn, resetData] = useFetchApi(
    AuthService.signIn,
  )
  useEffect(() => {
    if (isAuthenticating) {
      navigation.reset({
        index: 0,
        routes: [{ name: SCREENS.LIST_RACS }],
      })
    }
  }, [isAuthenticating])
  useEffect(() => {
    if (authResponse?.user.uid) {
      navigateToListRacs()
    }
    if (errorSignIn) {
      setAuthInput((prev) => ({ ...prev, password: '', invalidPassword: true }))
    }
  }, [authResponse, errorSignIn])

  const navigateToListRacs = () => {
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: SCREENS.LIST_RACS }],
      })
    }, 10)
  }
  const handleSignIn = useCallback(() => {
    fetchLogin(authInput)
  }, [authInput.email, authInput.password])

  const onChangeEmail = (value: string) => {
    setAuthInput((prev) => ({ ...prev, email: value, invalidEmail: !regex.email.test(value) }))
  }
  const onChangePassword = (value: string) => {
    setAuthInput((prev) => ({
      ...prev,
      password: value,
      invalidPassword: !value,
    }))
  }
  return {
    authInput,
    resetData,
    errorSignIn,
    handleSignIn,
    loadingSignIn,

    onChangeEmail,
    onChangePassword,
  }
}
