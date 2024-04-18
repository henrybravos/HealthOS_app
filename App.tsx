import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'
import { Provider } from 'react-native-paper'

import { FirebaseAppProvider } from '@common/context'
import Navigation from '@common/navigation/navigation'

export default function App() {
  return (
    <Provider>
      <FirebaseAppProvider>
        <View style={{ flex: 1 }}>
          <StatusBar style="auto" />
          <Navigation />
        </View>
      </FirebaseAppProvider>
    </Provider>
  )
}
