import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react'
import { View } from 'react-native'
import { Surface, useTheme } from 'react-native-paper'

import { useFetchApi } from '@common/hooks'
import { StackNavigation } from '@common/navigation/navigation.types'

import { RacsLegend, RacsList, RacsListTitle } from '@features/racs/components/list'

import { RacsService } from '@core/services'
import { User } from '@core/types'

const ListRacsManagement = () => {
  const navigation = useNavigation<StackNavigation>()
  const theme = useTheme()
  const [isLoading, racs, fetchGetRacs] = useFetchApi(RacsService.getRacsByUser)

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refreshRacs()
    })
    return unsubscribe
  }, [navigation])
  const refreshRacs = () => fetchGetRacs({ id: '1' } as User)

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
