import { NavigationContainer } from '@react-navigation/native'

import { AppProvider } from '@common/context'

import Menu from '@navigation/Menu'

export default function Navigation() {
  return (
    <NavigationContainer>
      <AppProvider>
        <Menu />
      </AppProvider>
    </NavigationContainer>
  )
}
