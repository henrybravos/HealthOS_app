import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'
import { Provider, useTheme } from 'react-native-paper'

import { FirebaseAppProvider } from '@common/context'

import { CreateRacsManagement, ListRacsManagement } from '@features/racs'

const Drawer = createDrawerNavigator()

function Navigation() {
  const theme = useTheme()
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.surfaceVariant,
          },
        }}
      >
        <Drawer.Screen
          name="ListRacs"
          component={ListRacsManagement}
          options={{
            headerTitleStyle: { fontSize: 14 },
            title: 'Lista de RACS',
          }}
        />
        <Drawer.Screen
          name="CreateRacs"
          component={CreateRacsManagement}
          options={{
            headerTitleStyle: { fontSize: 14 },
            title:
              'REPORTE DE ACTOS, CONDICIONES, INCIDENTES, SUGERENCIAS Y BUENAS PRÁCTICAS ( RACS)',
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}
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
