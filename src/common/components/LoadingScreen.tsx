import { Dimensions, StyleSheet, View } from 'react-native'
import { ProgressBar, Text, useTheme } from 'react-native-paper'

const WIDTH = Dimensions.get('window').width - 48
const LoadingScreen = () => {
  const theme = useTheme()
  return (
    <View style={styles.container}>
      <Text>Loading...</Text>
      <ProgressBar style={{ width: WIDTH }} visible indeterminate color={theme.colors.primary} />
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
})
export default LoadingScreen
