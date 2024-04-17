import { View } from 'react-native'
import { DataTable } from 'react-native-paper'

type DataTableProps<T> = Omit<React.ComponentProps<typeof DataTable>, 'children'> & {
  items: T[]
  columns: { title: string; keyItem: keyof T; flex?: number }[]
  minHeight?: number
}

export function DataTableComponent<T>(props: DataTableProps<T>) {
  const { items, columns, minHeight = 300 } = props

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
          {items.map((item) => (
            <DataTable.Row key={item['id' as keyof T] as string}>
              {columns.map(({ keyItem, flex }) => {
                const render = item[keyItem]
                if (typeof render === 'function') {
                  return (
                    <DataTable.Cell style={{ flex }} key={keyItem as string}>
                      {render()}
                    </DataTable.Cell>
                  )
                }
                return (
                  <DataTable.Cell style={{ flex }} key={keyItem as string}>
                    {render as string}
                  </DataTable.Cell>
                )
              })}
            </DataTable.Row>
          ))}
        </View>
      </View>

      <DataTable.Pagination
        page={1}
        numberOfPages={Math.ceil(items.length / 4)}
        onPageChange={(page) => () => {}}
        label={`1-2 of ${items.length}`}
        showFastPaginationControls
        // numberOfItemsPerPageList={[10, 15, 30]}
        // numberOfItemsPerPage={10}
        onItemsPerPageChange={(itemsPerPage) => () => {}}
        selectPageDropdownLabel={'Rows per page'}
      />
    </DataTable>
  )
}