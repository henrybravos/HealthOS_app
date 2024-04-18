import * as ImagePicker from 'expo-image-picker'

const useImagePicker = (callbackSelectImage?: (image: string | null) => void) => {
  const pickImage = (type: 'camera' | 'library') => async () => {
    if (type === 'camera') {
      const { status } = await ImagePicker.requestCameraPermissionsAsync()
      if (status !== 'granted') {
        console.error('Permission to access camera is required!')
        return
      }
    } else {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (status !== 'granted') {
        console.error('Permission to access camera roll is required!')
        return
      }
    }
    const callMethod =
      type === 'camera' ? ImagePicker.launchCameraAsync : ImagePicker.launchImageLibraryAsync
    const result = await callMethod({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    })

    if (!result.canceled && result.assets.length > 0) {
      console.log(result.assets[0].uri)
      callbackSelectImage?.(result.assets[0].uri || null)
    }
  }
  const handleResetImage = () => {
    callbackSelectImage?.(null)
  }
  return { pickImage, handleResetImage }
}
export default useImagePicker
