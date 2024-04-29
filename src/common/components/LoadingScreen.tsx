import { Dimensions, StyleSheet, View } from 'react-native'
import { ProgressBar, Text, useTheme } from 'react-native-paper'

const WIDTH = Dimensions.get('window').width - 48
const LoadingScreen = () => {
  const theme = useTheme()
  return (
    <View style={styles.container}>
      <ProgressBar style={{ width: WIDTH }} visible indeterminate color={theme.colors.primary} />
      <Text variant="bodySmall" style={styles.copyright}>
        {process.env.NODE_ENV} {process.env.EXPO_PUBLIC_PROJECT_ID} © {new Date().getFullYear()}
      </Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  copyright: { textAlign: 'center', marginTop: 8 },
})
export default LoadingScreen
