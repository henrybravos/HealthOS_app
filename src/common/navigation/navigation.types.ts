import { NavigationProp } from '@react-navigation/native'

import { Racs } from '@core/types'

export enum SCREENS {
  LOGIN = 'Login',
  LIST_RACS = 'ListRacs',
  CREATE_UPDATE_RACS = 'UpdateCreateRacs',
}

export type RootStackParamList = {
  [SCREENS.LIST_RACS]: undefined
  [SCREENS.CREATE_UPDATE_RACS]: Racs | undefined
  [SCREENS.LOGIN]: undefined
}
export type StackNavigation = NavigationProp<RootStackParamList>
