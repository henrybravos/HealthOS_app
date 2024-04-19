import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'
import { Provider } from 'react-native-paper'
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper'

import AppNavigation from './src/navigation/App'

const theme = {
  ...DefaultTheme,
  // Specify custom property
  myOwnProperty: true,
  // Specify custom property in nested object
  colors: {
    ...DefaultTheme.colors,
    primary: '#002e79',
  },
}
export default function App() {
  return (
    <Provider theme={theme}>
      <View style={{ flex: 1 }}>
        <StatusBar style="auto" />
        <AppNavigation />
      </View>
    </Provider>
  )
}
