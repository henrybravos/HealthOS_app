import { useState } from 'react'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { Button, Menu, TextInput } from 'react-native-paper'

export type OptionSelected = {
  id: string
  label: string
}
type DropdownListProps<T> = {
  items: T[]
  defaultOptionSelected?: T
  label?: string
  keyRender: keyof T
  autoClose?: boolean
  keyIdRender: keyof T
  itemSelected?: T | null
  error?: boolean
  callbackSelectedItem: (item: T | null) => void
}
function DropdownList<T>({
  error = false,
  items = [],
  defaultOptionSelected,
  keyIdRender,
  keyRender,
  itemSelected = defaultOptionSelected as T,
  autoClose = true,
  label = 'Select item',
  callbackSelectedItem = () => {},
}: DropdownListProps<T>) {
  const [openMenu, setOpenMenu] = useState(false)
  const toggleOpenMenu = () => setOpenMenu((prev) => !prev)
  const handleItemSelected = (item: T | null) => () => {
    callbackSelectedItem(item)
    if (item && autoClose) {
      setOpenMenu(false)
    }
  }
  return (
    <Menu
      visible={openMenu}
      onDismiss={toggleOpenMenu}
      style={{
        flex: 1,
      }}
      anchorPosition="bottom"
      anchor={
        <TouchableOpacity onPress={toggleOpenMenu}>
          <TextInput
            dense
            editable={false}
            style={{ flex: 1 }}
            mode="outlined"
            contentStyle={{ fontSize: 12 }}
            error={error}
            value={itemSelected?.[keyRender] as string}
            label={label}
            left={
              <TextInput.Icon
                icon={openMenu ? 'chevron-up' : 'chevron-down'}
                onPress={toggleOpenMenu}
              />
            }
          />
        </TouchableOpacity>
      }
    >
      <Menu.Item
        onPress={handleItemSelected(defaultOptionSelected as T)}
        title={defaultOptionSelected?.[keyRender] as string}
        dense
        contentStyle={{
          padding: 0,
          marginLeft: itemSelected?.[keyIdRender] === '' ? 0 : -8,
        }}
        style={{
          marginLeft: itemSelected?.[keyIdRender] === '' ? 0 : 32,
          padding: 0,
        }}
        leadingIcon={itemSelected?.[keyIdRender] === '' ? 'check' : ''}
      />
      {items.map((item) => {
        const isSelected = itemSelected?.[keyIdRender] === item[keyIdRender]
        return (
          <Menu.Item
            key={item[keyIdRender] as string}
            onPress={handleItemSelected(item)}
            titleStyle={{
              fontSize: 12,
            }}
            title={item[keyRender] as string}
            dense
            contentStyle={{
              padding: 0,
              marginLeft: isSelected ? 0 : -8,
            }}
            style={{
              marginLeft: isSelected ? 0 : 32,
              padding: 0,
            }}
            leadingIcon={isSelected ? 'check' : ''}
          />
        )
      })}
    </Menu>
  )
}
export default DropdownList