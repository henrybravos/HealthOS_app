import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react'
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
    <Surface
      style={{
        backgroundColor: theme.colors.surfaceVariant,
        flex: 1,
        paddingHorizontal: 2,
      }}
    >
      <RacsListTitle sizeItems={racs.length} />
      <RacsList racs={racs} isLoading={isLoading} refreshRacs={refreshRacs} />
      <RacsLegend />
    </Surface>
  )
}
export default ListRacsManagement
