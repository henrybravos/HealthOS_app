import { useState } from 'react'
import { View } from 'react-native'
import { RefreshControl, ScrollView } from 'react-native-gesture-handler'
import { DataTable, Icon, ProgressBar, Text } from 'react-native-paper'

type DataTableProps<T> = Omit<React.ComponentProps<typeof DataTable>, 'children'> & {
  items: Partial<T>[]
  columns: {
    title: string
    keyItem?: keyof T
    flex?: number
    renderCell?: (item: T) => JSX.Element
  }[]
  minHeight?: number
  loading?: boolean
  refreshItems: () => void
}

export function DataTableComponent<T>(props: DataTableProps<T>) {
  const [itemsPerPage, setItemsPerPage] = useState(15)
  const [page, setPage] = useState(0)
  const { items, columns, minHeight = 300 } = props
  const startIndex = page * itemsPerPage
  let endIndex = (page + 1) * itemsPerPage
  endIndex = endIndex > items.length ? items.length : endIndex
  const itemsPaginated = items.slice(startIndex, endIndex)
  return (
    <View style={{ height: '100%' }}>
      <DataTable {...props} style={{ minHeight, flex: 1 }}>
        <View style={{ flex: 1 }}>
          <DataTable.Header>
            {columns.map((column, index) => (
              <DataTable.Title
                style={{
                  flex: column.flex,
                }}
                key={index}
              >
                {column.title}
              </DataTable.Title>
            ))}
          </DataTable.Header>
          <ScrollView
            style={{ flex: 1 }}
            refreshControl={
              <RefreshControl refreshing={!!props.loading} onRefresh={props.refreshItems} />
            }
          >
            <View>
              {itemsPaginated.map((item) => (
                <DataTable.Row key={item['id' as keyof T] as string}>
                  {columns.map(({ keyItem, flex, renderCell }, indexColumn) => {
                    if (renderCell) {
                      return (
                        <DataTable.Cell style={{ flex, paddingRight: 4 }} key={indexColumn}>
                          {renderCell(item as T)}
                        </DataTable.Cell>
                      )
                    }
                    return (
                      <DataTable.Cell style={{ flex, paddingRight: 4 }} key={keyItem as string}>
                        {keyItem && (item[keyItem] as string)}
                      </DataTable.Cell>
                    )
                  })}
                </DataTable.Row>
              ))}
              {items.length === 0 && (
                <View
                  style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: 500 }}
                >
                  <Icon source="alert-circle" size={40} color="grey" />
                  <Text variant="bodySmall">No hay datos</Text>
                </View>
              )}
            </View>
          </ScrollView>
        </View>
        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(items.length / itemsPerPage)}
          onPageChange={setPage}
          label={`${`0${startIndex + 1}`.slice(-2, 4)}-${endIndex} / ${items.length}`}
          showFastPaginationControls
          numberOfItemsPerPageList={[10, 15, 30]}
          numberOfItemsPerPage={itemsPerPage}
          onItemsPerPageChange={setItemsPerPage}
          style={{ flexDirection: 'row', flexWrap: 'nowrap' }}
        />
      </DataTable>
    </View>
  )
}
