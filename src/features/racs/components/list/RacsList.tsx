import { View } from 'react-native'
import { Surface } from 'react-native-paper'

import { DataTableComponent } from '@common/components'

import { COLUMNS_RACS_TABLE } from '@features/racs/racs.const'

type RacsListProps = {
  refreshRacs: () => void
  isLoading: boolean
  racs: any
}
const RacsList = ({ isLoading, racs, refreshRacs }: RacsListProps) => {
  return (
    <View style={{ flex: 1 }}>
      <Surface
        style={{
          flex: 1,
          borderRadius: 8,
        }}
      >
        <DataTableComponent
          refreshItems={refreshRacs}
          loading={isLoading}
          columns={COLUMNS_RACS_TABLE}
          items={racs || []}
        />
      </Surface>
    </View>
  )
}
export default RacsList
