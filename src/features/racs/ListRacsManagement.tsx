import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react'
import { View } from 'react-native'
import { useTheme } from 'react-native-paper'

import { useFirebaseContext } from '@common/context'
import { useFetchApi } from '@common/hooks'

import { RacsLegend, RacsList, RacsListTitle } from '@features/racs/components/list'

import { RacsService } from '@core/services'
import { User } from '@core/types'

import { StackNavigation } from '@navigation/navigation.types'

const ListRacsManagement = () => {
  const navigation = useNavigation<StackNavigation>()
  const theme = useTheme()
  const [isLoading, racs, fetchGetRacs] = useFetchApi(RacsService.getRacsByUser)
  const { userExtra } = useFirebaseContext()

  useEffect(() => {
    if (!userExtra || !userExtra.id) return
    refreshRacs()
  }, [userExtra])
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('focus')
      refreshRacs()
    })
    return unsubscribe
  }, [navigation])
  const refreshRacs = () => fetchGetRacs(userExtra)

  return (
    <View
      style={{
        backgroundColor: theme.colors.surfaceVariant,
        flex: 1,
        paddingHorizontal: 2,
        flexDirection: 'column',
        paddingBottom: 16,
      }}
    >
      <RacsListTitle sizeItems={racs?.length || 0} />
      <RacsList racs={racs} isLoading={isLoading} refreshRacs={refreshRacs} />
      <RacsLegend />
    </View>
  )
}
export default ListRacsManagement
