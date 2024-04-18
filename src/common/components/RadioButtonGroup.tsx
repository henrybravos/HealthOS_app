import { View } from 'react-native'
import { RadioButton, RadioButtonGroupProps, Text, useTheme } from 'react-native-paper'

type RadioButtonGroupComponentProps = Omit<RadioButtonGroupProps, 'children'> & {
  items: { label: string; value: string }[]
  label?: string
  error?: boolean
  numColumns?: number
}
const RadioButtonGroup = ({
  items,
  error,
  label = 'Seleccione una opción',
  numColumns = 1,
  ...rest
}: RadioButtonGroupComponentProps) => {
  const theme = useTheme()
  return (
    <RadioButton.Group {...rest}>
      <Text
        style={{
          backgroundColor: theme.colors.surface,
          position: 'absolute',
          top: -8,
          left: 10,
          zIndex: 1,
          color: theme.colors.inverseSurface,
          paddingHorizontal: 4,
        }}
        variant="bodySmall"
      >
        {label}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          borderWidth: 0.8,
          borderColor: error ? theme.colors.error : theme.colors.outline,
          borderRadius: 4,
          backgroundColor: theme.colors.surface,
          flexWrap: 'wrap',
          gap: -16,
        }}
      >
        {items.map((item) => (
          <RadioButton.Item
            key={item.value}
            labelVariant="labelSmall"
            mode="ios"
            label={item.label}
            labelStyle={{
              color: theme.colors.secondary,
              fontWeight: rest.value === item.value ? 'bold' : 'normal',
            }}
            value={item.value}
          />
        ))}
      </View>
    </RadioButton.Group>
  )
}

export default RadioButtonGroup
