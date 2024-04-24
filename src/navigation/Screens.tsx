import { useNavigation } from '@react-navigation/core'
import { DrawerActions } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Fragment, useEffect } from 'react'
import { View } from 'react-native'
import { Button, Icon, ProgressBar, Text, useTheme } from 'react-native-paper'

import LoadingScreen from '@common/components/LoadingScreen'
import { useAppContext } from '@common/context'

import LoginManagement from '@features/login/LoginManagement'
import CreateRacsManagement from '@features/racs/CreateRacsManagement'
import ListRacsManagement from '@features/racs/ListRacsManagement'

import { RootStackParamList, SCREENS } from '@navigation/navigation.types'

const Stack = createStackNavigator<RootStackParamList>()
export default () => {
  const { setOptions, dispatch } = useNavigation()
  const theme = useTheme()
  const { isAuthenticating, isLoading } = useAppContext()
  useEffect(() => setOptions({ gestureEnabled: isAuthenticating }), [isAuthenticating, setOptions])
  if (isLoading) {
    return <LoadingScreen />
  }
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.surfaceVariant,
        },
        headerTitleAlign: 'left',
        headerTitleContainerStyle: { marginLeft: -8 },
        headerTitle: ({ children }) => (
          <Text variant="bodySmall" style={{ fontWeight: 'bold', textAlign: 'center' }}>
            {children}
          </Text>
        ),
        headerLeft: () => (
          <Button onPress={() => dispatch(DrawerActions.toggleDrawer())}>
            <Icon source="filter-variant" size={24} />
          </Button>
        ),
      }}
    >
      {isAuthenticating && (
        <Fragment>
          <Stack.Screen
            name={SCREENS.LIST_RACS}
            component={ListRacsManagement}
            options={{
              headerTitleStyle: { fontSize: 14 },
              title: 'RACS',
            }}
          />
          <Stack.Screen
            name={SCREENS.CREATE_UPDATE_RACS}
            component={CreateRacsManagement}
            options={{
              headerTitleStyle: { fontSize: 14 },
              title:
                'REPORTE DE ACTOS, CONDICIONES, INCIDENTES, SUGERENCIAS Y BUENAS PRÁCTICAS ( RACS)',
            }}
          />
        </Fragment>
      )}
      <Stack.Screen
        name={SCREENS.LOGIN}
        component={LoginManagement}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
}
