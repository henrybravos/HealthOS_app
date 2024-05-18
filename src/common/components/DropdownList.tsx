import { useState } from 'react'
import { Platform, TouchableOpacity } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { Menu, Text, TextInput, useTheme } from 'react-native-paper'

const isAndroid = Platform.OS === 'android'
const Touchable = isAndroid ? TouchableOpacity : TouchableWithoutFeedback

export type OptionSelected = {
  id: string
  label: string
}
const otherOption = {
  id: 'OTHER',
  name: 'OTRO',
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
  enableOther?: boolean
  callbackSelectedItem: (item: T | null) => void
}
function DropdownList<T>({
  error = false,
  enableOther = false,
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
  const theme = useTheme()
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
        <Touchable onPress={toggleOpenMenu}>
          <TextInput
            dense
            editable={false}
            contentStyle={{
              fontSize: 12,
              left: -24,
            }}
            style={{
              backgroundColor: theme.colors.surface,
              height: 40,
              width: '100%',
            }}
            mode="outlined"
            error={error}
            value={itemSelected?.[keyRender] as string}
            label={
              <Text
                variant="bodySmall"
                style={{
                  backgroundColor: theme.colors.surface,
                  color: theme.colors.inverseSurface,
                  fontSize: 16,
                }}
              >
                {label}
              </Text>
            }
            left={
              <TextInput.Icon
                icon={openMenu ? 'chevron-up' : 'chevron-down'}
                onPress={toggleOpenMenu}
                size={20}
                style={{ height: 20, width: 20, padding: 0, position: 'absolute', left: -10 }}
              />
            }
          />
        </Touchable>
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
      {items?.map((item) => {
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
      <Menu.Item
        onPress={handleItemSelected(otherOption as T)}
        title={otherOption.name}
        titleStyle={{
          fontSize: 12,
        }}
        dense
        contentStyle={{
          padding: 0,
          marginLeft: itemSelected?.[keyIdRender] === 'OTHER' ? 0 : -8,
        }}
        style={{
          marginLeft: itemSelected?.[keyIdRender] === 'OTHER' ? 0 : 32,
          padding: 0,
        }}
        leadingIcon={itemSelected?.[keyIdRender] === 'OTHER' ? 'check' : ''}
      />
    </Menu>
  )
}
export default DropdownList
