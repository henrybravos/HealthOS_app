import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerNavigationOptions,
  createDrawerNavigator,
  useDrawerStatus,
} from '@react-navigation/drawer'
import { useCallback, useEffect, useRef } from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import { Button, Divider, Text, useTheme } from 'react-native-paper'

import { useAppContext } from '@common/context'

import { SCREENS } from '@navigation/navigation.types'

import Screens from './Screens'

const Drawer = createDrawerNavigator()

const ScreensStack = () => {
  const { colors } = useTheme()

  const isDrawerOpen = useDrawerStatus() === 'open'
  const animation = useRef(new Animated.Value(0)).current

  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.88],
  })

  const borderRadius = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 16],
  })

  const animatedStyle = {
    borderRadius: borderRadius,
    transform: [{ scale: scale }],
  }

  useEffect(() => {
    Animated.timing(animation, {
      duration: 200,
      useNativeDriver: true,
      toValue: isDrawerOpen ? 1 : 0,
    }).start()
  }, [isDrawerOpen, animation])
  return (
    <Animated.View
      style={StyleSheet.flatten([
        animatedStyle,
        {
          flex: 1,
          overflow: 'hidden',
          borderColor: colors.primary,
          borderWidth: isDrawerOpen ? 1 : 0,
        },
      ])}
    >
      <Screens />
    </Animated.View>
  )
}

/* custom drawer menu */
const DrawerContentCustom = (props: DrawerContentComponentProps) => {
  const { navigation } = props
  const { colors } = useTheme()
  const { isAuthenticating, userExtra, handleSignOut } = useAppContext()

  const state = navigation.getState()
  const route = state.routes[state.index]
  const name =
    route.state?.routes[route.state.index || 0].name || isAuthenticating
      ? route.state?.routes[route.state.index || 0].name
      : 'Login'
  const handleNavigation = useCallback(
    (to: string) => {
      navigation.navigate(to)
    },
    [navigation],
  )
  const screens = [
    {
      name: 'RACS',
      to: SCREENS.LIST_RACS,
      icon: 'format-list-bulleted-square',
    },
    {
      name: 'NUEVO RACS',
      to: SCREENS.CREATE_UPDATE_RACS,
      icon: 'text-box-plus',
    },
  ]

  const handleCloseSession = useCallback(() => {
    handleSignOut()
    navigation.navigate(SCREENS.LOGIN)
  }, [handleNavigation])
  return (
    <DrawerContentScrollView
      {...props}
      scrollEnabled
      removeClippedSubviews
      renderToHardwareTextureAndroid
      contentContainerStyle={{
        flex: 1,
        paddingTop: 48,
        backgroundColor: colors.elevation.level5,
        borderTopRightRadius: 16,
        borderBottomRightRadius: 16,
      }}
    >
      <View style={{ flex: 1 }}>
        <View style={{ padding: 4, marginLeft: 8 }}>
          <Text variant="titleSmall">{`${userExtra?.name || ''} ${userExtra?.surname || ''}`}</Text>
          <Text variant="bodySmall">{`${userExtra?.email || ''}`}</Text>
        </View>
        <Divider bold />
        <View style={{ flex: 1, marginHorizontal: 4, marginVertical: 8 }}>
          {screens?.map((screen, index) => {
            const isActive = name === screen.to
            const navigate = () => handleNavigation(screen.to)
            return (
              <Button
                contentStyle={{ justifyContent: 'flex-start' }}
                textColor={isActive ? colors.primary : colors.secondary}
                key={index}
                onPress={navigate}
                icon={screen.icon}
              >
                {screen.name}
              </Button>
            )
          })}
        </View>
        <Divider bold />
        <Button compact mode="text" onPress={handleCloseSession}>
          Cerrar sesión
        </Button>
      </View>
    </DrawerContentScrollView>
  )
}

export default () => {
  const { isAuthenticating } = useAppContext()
  return (
    <View style={{ flex: 1 }}>
      <Drawer.Navigator
        screenOptions={{
          ...screenOptions,
          swipeEnabled: isAuthenticating,
        }}
        drawerContent={(props) => <DrawerContentCustom {...props} />}
      >
        <Drawer.Screen name="App" component={ScreensStack} />
      </Drawer.Navigator>
    </View>
  )
}
const screenOptions: DrawerNavigationOptions = {
  drawerStyle: {
    flex: 1,
    width: '60%',
    borderRightWidth: 0,
    backgroundColor: 'transparent',
  },
  drawerType: 'slide',
  overlayColor: 'transparent',
  headerShown: false,
  sceneContainerStyle: { backgroundColor: 'transparent' },
}
