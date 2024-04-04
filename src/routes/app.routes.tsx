import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { GoalScreen, Home } from '@screens'

export type AppScreensParamList = {
  Home: undefined
  Goal: undefined
}

const Stack = createNativeStackNavigator<AppScreensParamList>()

export function AppRoutes() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Goal" component={GoalScreen} />
    </Stack.Navigator>
  )
}
