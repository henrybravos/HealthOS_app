import { Dimensions, Image, StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Button, ProgressBar, Surface, Text, useTheme } from 'react-native-paper'

import TextInputComponent from '@common/components/TextInput'

import { useAuth } from '@features/login/hooks/useAuth'

const logo = require('@assets/images/logo.png')

const HEIGHT_SCREEN = Dimensions.get('window').height
const WIDTH_SCREEN = Dimensions.get('window').width
const HEIGHT_CONTAINER = 240
const WIDTH_CONTAINER = WIDTH_SCREEN - 80
const LoginManagement = () => {
  const theme = useTheme()
  const ctxAuth = useAuth()
  return (
    <ScrollView
      automaticallyAdjustContentInsets
      automaticallyAdjustKeyboardInsets
      automaticallyAdjustsScrollIndicatorInsets
    >
      <View style={styles.container}>
        <Image source={logo} style={styles.imageLogo} />
        <View style={styles.content}>
          <View style={styles.surface}>
            <Surface elevation={2} style={{ alignItems: 'center', paddingVertical: 16 }}>
              <Text variant="bodyLarge">INGRESO</Text>
              <View style={styles.formContainer}>
                <TextInputComponent
                  iconLeft="at"
                  value={ctxAuth.authInput.email}
                  onChangeText={ctxAuth.onChangeEmail}
                  label="Correo electrónico"
                  keyboardType="email-address"
                  mode="outlined"
                />
                <TextInputComponent
                  iconLeft="lock-outline"
                  value={ctxAuth.authInput.password}
                  onChangeText={ctxAuth.onChangePassword}
                  label="Contraseña"
                  secureTextEntry
                  mode="outlined"
                />
                <ProgressBar indeterminate visible={ctxAuth.loadingSignIn} />
                {ctxAuth.errorSignIn && (
                  <Text
                    variant="bodySmall"
                    style={{ color: theme.colors.error, textAlign: 'center' }}
                  >
                    Correo o contraseña incorrectos
                  </Text>
                )}
                <Button
                  onPress={ctxAuth.handleSignIn}
                  mode="contained"
                  compact
                  disabled={ctxAuth.loadingSignIn}
                >
                  INGRESAR
                </Button>
              </View>
            </Surface>
          </View>
          <Text variant="bodySmall" style={styles.copyright}>
            © {new Date().getFullYear()}
          </Text>
        </View>
      </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: HEIGHT_SCREEN,
  },
  surface: {
    flex: 1,
    borderRadius: 8,
    alignItems: 'center',
  },
  content: { width: '90%', height: HEIGHT_CONTAINER, marginVertical: 32 },
  formContainer: {
    width: WIDTH_CONTAINER,
    marginHorizontal: 16,
    gap: 2,
    flex: 1,
    justifyContent: 'center',
  },
  imageLogo: {
    height: 48,
    width: 200,
  },
  copyright: { textAlign: 'center', marginTop: 8 },
})

export default LoginManagement
