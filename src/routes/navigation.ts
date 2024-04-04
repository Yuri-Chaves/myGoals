import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { AppScreensParamList } from './app.routes'

export type AppScreensProps<Screen extends keyof AppScreensParamList> =
  NativeStackScreenProps<AppScreensParamList, Screen>
