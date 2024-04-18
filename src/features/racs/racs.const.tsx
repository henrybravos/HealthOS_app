import { useNavigation } from '@react-navigation/native'
import { Fragment } from 'react'
import { IconButton, Text } from 'react-native-paper'

import { SCREENS, StackNavigation } from '@common/navigation/navigation.types'

import { Racs, StatusRacs } from '@core/types'

const ActionsRacs = ({ racs }: { racs: Racs }) => {
  const navigation = useNavigation<StackNavigation>()
  const navigateToEdit = () => {
    navigation.navigate(SCREENS.CREATE_UPDATE_RACS, { racs })
  }
  return (
    <Fragment>
      {racs.status === StatusRacs.PENDING && (
        <IconButton size={18} icon="pencil" onPress={navigateToEdit} />
      )}
    </Fragment>
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
    renderCell: (item) => <ActionsRacs racs={item} />,
    flex: 0.5,
  },
]
