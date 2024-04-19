import { NavigationContainer } from '@react-navigation/native'

import { FirebaseAppProvider, useFirebaseContext } from '@common/context'

import Menu from '@navigation/Menu'

export default function Navigation() {
  return (
    <NavigationContainer>
      <FirebaseAppProvider>
        <Menu />
      </FirebaseAppProvider>
    </NavigationContainer>
  )
}
