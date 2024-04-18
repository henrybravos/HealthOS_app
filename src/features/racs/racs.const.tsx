import { useNavigation } from '@react-navigation/native'
import { Fragment } from 'react'
import { View } from 'react-native'
import { IconButton, Text } from 'react-native-paper'

import { COLOR_CLASSIFICATION, COLOR_RACS_CLOSE, COLOR_RACS_PENDING } from '@common/const/colors'
import { SCREENS, StackNavigation } from '@common/navigation/navigation.types'

import { Racs, StatusRacs } from '@core/types'

const ActionsRacs = ({ racs }: { racs: Racs }) => {
  const navigation = useNavigation<StackNavigation>()
  const navigateToEdit = () => {
    navigation.navigate(SCREENS.CREATE_UPDATE_RACS, racs)
  }
  const color = COLOR_CLASSIFICATION[racs.classification] || 'black'

  return (
    <View style={{ flexDirection: 'row', gap: -18, alignItems: 'center' }}>
      <IconButton size={12} icon="circle" iconColor={color} />
      {racs.status === StatusRacs.PENDING ? (
        <IconButton
          size={18}
          icon="circle-edit-outline"
          iconColor={COLOR_RACS_PENDING}
          onPress={navigateToEdit}
        />
      ) : (
        <IconButton size={18} icon="check-circle" iconColor={COLOR_RACS_CLOSE} />
      )}
    </View>
  )
}
export const COLUMNS_RACS_TABLE: {
  title: string
  flex?: number
  renderCell?: (item: Racs) => JSX.Element
  keyItem?: keyof Racs
}[] = [
  {
    title: 'Fecha',
    renderCell: (item) => {
      const dateStr = item.createdAt.toDate().toLocaleDateString()
      const dayMonth = dateStr.slice(0, -5)
      const year = dateStr.slice(-4, 20)
      return (
        <View>
          <Text variant="bodySmall">{dayMonth}</Text>
          <Text variant="bodySmall">{year}</Text>
        </View>
      )
    },
    flex: 0.5,
  },
  {
    title: 'Lugar',
    keyItem: 'place',
    renderCell: (item) => <Text variant="bodySmall">{item.place?.name}</Text>,
    flex: 1,
  },
  {
    title: 'Empresa',
    keyItem: 'company',
    renderCell: (item) => <Text variant="bodySmall">{item.company?.name}</Text>,
    flex: 1,
  },
  {
    title: 'Descripción',
    keyItem: 'description',
    renderCell: (item) => <Text variant="bodySmall">{item.description}</Text>,
    flex: 2,
  },

  {
    title: '',
    renderCell: (item) => <ActionsRacs racs={item} />,
    flex: 0.65,
  },
]
