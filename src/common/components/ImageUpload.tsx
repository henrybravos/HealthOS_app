import { Image, ImageProps, TouchableWithoutFeedback } from 'react-native'
import { IconButton, ProgressBar, Surface, Text, useTheme } from 'react-native-paper'

import { useImagePicker } from '@common/hooks'

const defaultImage = require('@common/assets/images/camera.png')
type ImageUploadProps = Omit<ImageProps, 'source'> & {
  callbackSelectImage?: (image: string | null) => void
  description?: string
  error?: boolean
  uri?: string
  loading?: boolean
}
const ImageUpload = ({
  uri,
  height = 150,
  width,
  description,
  callbackSelectImage,
  loading,
  error,
  ...rest
}: ImageUploadProps) => {
  const theme = useTheme()
  const { pickImage, handleResetImage } = useImagePicker(callbackSelectImage)

  const source = uri ? { uri } : defaultImage
  return (
    <Surface
      elevation={1}
      style={{
        borderWidth: error ? 2 : 0.8,
        borderColor: error ? theme.colors.error : theme.colors.outline,
        borderRadius: 4,
        paddingHorizontal: 8,
        paddingBottom: 8,
        backgroundColor: theme.colors.surface,
      }}
    >
      {loading && <ProgressBar indeterminate color={theme.colors.primary} />}
      {description && (
        <Text
          style={{
            position: 'absolute',
            top: -8,
            left: 10,
            color: theme.colors.inverseSurface,
            paddingHorizontal: 4,
            zIndex: 1,
            backgroundColor: theme.colors.surface,
          }}
          variant="bodySmall"
        >
          {description}
        </Text>
      )}
      <TouchableWithoutFeedback onPress={pickImage('camera')}>
        <Image
          {...rest}
          style={{ height, width, resizeMode: 'center', marginTop: 8 }}
          borderRadius={4}
          source={source}
        />
      </TouchableWithoutFeedback>
      {uri && (
        <IconButton
          style={{ position: 'absolute', right: 4, top: 76 }}
          mode="contained"
          size={18}
          icon="delete"
          onPress={handleResetImage}
        />
      )}

      <IconButton
        style={{ position: 'absolute', right: 4, top: 4 }}
        mode="contained"
        size={18}
        icon="camera"
        onPress={pickImage('camera')}
      />
      <IconButton
        style={{ position: 'absolute', right: 4, top: 40 }}
        mode="contained"
        size={18}
        icon="image-multiple"
        onPress={pickImage('library')}
      />
    </Surface>
  )
}
export default ImageUpload
