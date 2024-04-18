import { useState } from 'react'
import { View } from 'react-native'
import { DataTable, ProgressBar } from 'react-native-paper'

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
}

export function DataTableComponent<T>(props: DataTableProps<T>) {
  const [page, setPage] = useState(0)
  const { items, columns, minHeight = 300 } = props
  const itemsPerPage = 10
  const startIndex = page * itemsPerPage
  const endIndex = (page + 1) * itemsPerPage
  const itemsPaginated = items.slice(startIndex, endIndex)
  return (
    <DataTable {...props} style={{ minHeight, justifyContent: 'space-between' }}>
      <View>
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
        <View>
          {props.loading && <ProgressBar indeterminate />}
          {itemsPaginated.map((item) => (
            <DataTable.Row key={item['id' as keyof T] as string}>
              {columns.map(({ keyItem, flex, renderCell }, indexColumn) => {
                if (renderCell) {
                  return (
                    <DataTable.Cell style={{ flex }} key={indexColumn}>
                      {renderCell(item as T)}
                    </DataTable.Cell>
                  )
                }
                return (
                  <DataTable.Cell style={{ flex }} key={keyItem as string}>
                    {keyItem && (item[keyItem] as string)}
                  </DataTable.Cell>
                )
              })}
            </DataTable.Row>
          ))}
        </View>
      </View>

      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(items.length / itemsPerPage)}
        onPageChange={setPage}
        label={`${startIndex + 1}-${endIndex} de ${items.length}`}
        showFastPaginationControls
        // numberOfItemsPerPageList={[10, 15, 30]}
        // numberOfItemsPerPage={10}
        onItemsPerPageChange={(itemsPerPage) => () => {}}
      />
    </DataTable>
  )
}
