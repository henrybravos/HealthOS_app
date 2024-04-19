import { useNavigation } from '@react-navigation/native'
import { View } from 'react-native'
import { IconButton, Text } from 'react-native-paper'

import { SCREENS, StackNavigation } from '@navigation/navigation.types'

const RacsListTitle = ({ sizeItems }: { sizeItems: number }) => {
  const navigation = useNavigation<StackNavigation>()
  const navigateToCreateRacs = () => navigation.navigate(SCREENS.CREATE_UPDATE_RACS)

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ flex: 1, marginLeft: 8 }}>
        <Text variant="bodyLarge">Mis resportes ({sizeItems})</Text>
      </View>
      <IconButton
        icon="plus"
        containerColor="white"
        mode="outlined"
        size={16}
        onPress={navigateToCreateRacs}
      />
    </View>
  )
}
export default RacsListTitle
