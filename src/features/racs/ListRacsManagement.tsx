import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react'
import { View } from 'react-native'
import { IconButton, Surface, Text, useTheme } from 'react-native-paper'

import { DataTableComponent } from '@common/components'
import { useFetchApi } from '@common/hooks'

import { COLUMNS_RACS_TABLE } from '@features/racs/racs.const'

import { RacsService } from '@core/services'
import { User } from '@core/types'

const ListRacsManagement = () => {
  const navigation = useNavigation()
  const theme = useTheme()
  const [isLoading, racs, fetchGetRacs] = useFetchApi(RacsService.getRacsByUser)

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchGetRacs({ id: '1' } as User)
    })
    return unsubscribe
  }, [navigation])

  const navigateToCreateRacs = () => {
    navigation.navigate('CreateRacs' as never)
  }

  return (
    <Surface
      style={{
        backgroundColor: theme.colors.surfaceVariant,
        flex: 1,
        paddingHorizontal: 8,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1 }} />
        <IconButton icon="plus" mode="outlined" size={16} onPress={navigateToCreateRacs} />
      </View>
      <Surface>
        <DataTableComponent loading={isLoading} columns={COLUMNS_RACS_TABLE} items={racs || []} />
      </Surface>
      <View style={{ flex: 1, flexDirection: 'row', gap: 8, marginTop: 8 }}>
        <Text
          style={{ borderTopColor: 'blue', borderTopWidth: 2, color: theme.colors.inverseSurface }}
        >
          Cerrado
        </Text>
        <Text
          style={{ borderTopColor: 'green', borderTopWidth: 2, color: theme.colors.inverseSurface }}
        >
          Pendiente
        </Text>
      </View>
    </Surface>
  )
}
export default ListRacsManagement
