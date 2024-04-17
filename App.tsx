import { StatusBar } from 'expo-status-bar'
import { SafeAreaView, StyleSheet } from 'react-native'
import { Provider } from 'react-native-paper'

import FirebaseAppProvider from '@context/FirebaseProvider'

export default function App() {
  return (
    <Provider>
      <FirebaseAppProvider>
        <SafeAreaView style={styles.container}>
          <StatusBar style="auto" />
        </SafeAreaView>
      </FirebaseAppProvider>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    margin: 8,
  },
})
