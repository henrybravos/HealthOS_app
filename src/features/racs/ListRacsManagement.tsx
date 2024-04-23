import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { useTheme } from 'react-native-paper'

import { useAppContext } from '@common/context'
import { useFetchApi } from '@common/hooks'

import { RacsLegend, RacsList, RacsListTitle } from '@features/racs/components/list'

import { RacsService } from '@core/services'

import { StackNavigation } from '@navigation/navigation.types'

const ListRacsManagement = () => {
  const navigation = useNavigation<StackNavigation>()
  const theme = useTheme()
  const [isLoading, racs, fetchGetRacs] = useFetchApi(RacsService.getRacsByUser)
  const { userExtra } = useAppContext()

  useEffect(() => {
    if (!userExtra || !userExtra.id) return
    refreshRacs()
  }, [userExtra])
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', refreshRacs)
    return unsubscribe
  }, [navigation, userExtra])
  const refreshRacs = () => fetchGetRacs(userExtra)

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: theme.colors.surfaceVariant,
      }}
    >
      {/* <Button onPress={initCollections}>LLENAR DATA</Button> */}
      <RacsListTitle sizeItems={racs?.length || 0} />
      <RacsList racs={racs} isLoading={isLoading} refreshRacs={refreshRacs} />
      <RacsLegend />
    </View>
  )
}
export default ListRacsManagement

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 2,
    flexDirection: 'column',
    paddingBottom: 16,
  },
})
