import { View } from 'react-native'
import { Text, TextInput, TextInputProps, useTheme } from 'react-native-paper'

type TextInputComponentProps = Omit<TextInputProps, 'left' | 'right' | 'error' | 'dense'> & {
  error?: string
  iconLeft?: string
  iconRight?: string
}
const TextInputComponent = ({ iconLeft, iconRight, error, ...rest }: TextInputComponentProps) => {
  const theme = useTheme()
  return (
    <View>
      <TextInput
        {...rest}
        left={iconLeft && <TextInput.Icon color={theme.colors.primary} icon={iconLeft} size={16} />}
        right={
          iconRight && <TextInput.Icon color={theme.colors.primary} icon={iconRight} size={16} />
        }
        dense
        error={!!error}
      />
      {error && <Text style={{ color: theme.colors.error }}>{error}</Text>}
    </View>
  )
}
export default TextInputComponent
