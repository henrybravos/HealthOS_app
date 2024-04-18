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
    <Surface
      style={{
        flex: 1,
      }}
    >
      <DataTableComponent
        refreshItems={refreshRacs}
        loading={isLoading}
        columns={COLUMNS_RACS_TABLE}
        items={racs || []}
      />
    </Surface>
  )
}
export default RacsList
