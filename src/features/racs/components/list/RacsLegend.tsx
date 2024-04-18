import { View } from 'react-native'
import { IconButton, Text } from 'react-native-paper'

import {
  COLOR_RACS_CLOSE,
  COLOR_RACS_HIGH,
  COLOR_RACS_LOW,
  COLOR_RACS_MEDIUM,
  COLOR_RACS_PENDING,
} from '@common/const/colors'

const RacsLegend = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 8,
        justifyContent: 'space-between',
        paddingRight: 8,
        backgroundColor: 'white',
        margin: 8,
        paddingLeft: 8,
        borderRadius: 8,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
        <View style={{ backgroundColor: COLOR_RACS_LOW, width: 4, borderRadius: 4, height: 18 }} />
        <Text variant="labelSmall">Bajo</Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
        <View
          style={{ backgroundColor: COLOR_RACS_MEDIUM, width: 4, borderRadius: 4, height: 16 }}
        />
        <Text variant="labelSmall">Medio</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
        <View style={{ backgroundColor: COLOR_RACS_HIGH, width: 4, borderRadius: 4, height: 16 }} />
        <Text variant="labelSmall">Alto</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <IconButton
          size={16}
          icon="circle-edit-outline"
          iconColor={COLOR_RACS_PENDING}
          style={{ margin: 0, padding: 0 }}
        />
        <Text variant="labelSmall">Pendiente</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <IconButton
          size={16}
          icon="check-circle"
          iconColor={COLOR_RACS_CLOSE}
          style={{ margin: 0, padding: 0 }}
        />
        <Text variant="labelSmall">Cerrado</Text>
      </View>
    </View>
  )
}
export default RacsLegend
