import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import { useTheme } from 'react-native-paper'

import { CreateRacsManagement, ListRacsManagement } from '@features/racs'

import { RootStackParamList, SCREENS } from './navigation.types'

const Drawer = createDrawerNavigator<RootStackParamList>()

export default function Navigation() {
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
          name={SCREENS.LIST_RACS}
          component={ListRacsManagement}
          options={{
            headerTitleStyle: { fontSize: 14 },
            title: 'Lista de RACS',
          }}
        />
        <Drawer.Screen
          name={SCREENS.CREATE_UPDATE_RACS}
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
