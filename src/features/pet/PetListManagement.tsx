import { View } from 'react-native'
import { StyleSheet } from 'react-native'
import { Button, IconButton, Surface, Text } from 'react-native-paper'

import { DataTableComponent } from '@common/components'
import { Pet } from '@common/types'

type Item = Pet & {
  opts: () => JSX.Element
}
const columns: {
  title: string
  flex?: number
  keyItem: keyof Item
}[] = [
  { title: 'Fecha', keyItem: 'execution_date', flex: 0.8 },
  {
    title: 'Código',
    keyItem: 'code',
    flex: 1,
  },
  {
    title: 'Lugar',
    keyItem: 'place',
    flex: 2,
  },
  {
    title: '',
    keyItem: 'opts',
    flex: 0.5,
  },
]
const items: Item[] = [
  {
    code: 'AA-24-001',
    id: '1',
    name: 'Recepción, almacenamiento, despacho de Materiales Peligrosos',
    place: 'Quellaveco',
    execution_date: '28/12/2020',
    opts: () => {
      return <IconButton size={18} icon="eye" onPress={() => {}} />
    },
  },
  {
    code: 'AA-24-002',
    id: '2',
    name: 'Recepción, almacenamiento, despacho de Materiales Peligrosos',
    place: 'Minera Shahuindo',
    execution_date: '28/12/2021',
    opts: () => {
      return <IconButton size={18} icon="eye" onPress={() => {}} />
    },
  },
]
export const PetListManagement = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="displaySmall">Lista de pets</Text>
        <Button compact mode="contained" onPress={() => {}}>
          Nuevo
        </Button>
      </View>
      <Surface elevation={4} style={{ width: '100%' }}>
        <DataTableComponent columns={columns} items={items} />
      </Surface>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
})
