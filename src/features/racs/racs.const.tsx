import { View } from 'react-native'
import { IconButton, Text } from 'react-native-paper'

import { Racs, StatusRacs } from '@core/types'

export const COLUMNS_RACS_TABLE: {
  title: string
  flex?: number
  renderCell?: (item: Racs) => JSX.Element
  keyItem?: keyof Racs
}[] = [
  {
    title: 'Fecha',
    renderCell: (item) => (
      <Text
        style={{
          borderBottomColor: item.status === StatusRacs.CLOSED ? 'blue' : 'green',
          borderBottomWidth: 1,
        }}
      >
        {item.createdAt.toDate().toLocaleDateString()}
      </Text>
    ),
    flex: 1,
  },
  {
    title: 'Lugar',
    keyItem: 'place',
    renderCell: (item) => <Text>{item.place?.name}</Text>,
    flex: 1,
  },
  {
    title: 'Empresa',
    keyItem: 'company',
    renderCell: (item) => <Text>{item.company?.name}</Text>,
    flex: 1,
  },
  {
    title: 'Descripción',
    keyItem: 'description',
    flex: 1,
  },

  {
    title: '',
    renderCell: (item) => (
      <View style={{ flexDirection: 'row', gap: -16 }}>
        <IconButton size={18} icon="eye" onPress={() => {}} />
        {item.status === StatusRacs.PENDING && (
          <IconButton size={18} icon="pencil" onPress={() => {}} />
        )}
      </View>
    ),
    flex: 0.8,
  },
]
