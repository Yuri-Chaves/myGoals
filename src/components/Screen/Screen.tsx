/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { KeyboardAvoidingView, Platform, View } from 'react-native'

import { useNavigation } from '@react-navigation/native'

import { useAppSafeArea, useAppTheme } from '@hooks'
import { Theme } from '@theme'

import { Box, BoxProps } from '../Box/Box'
import { Icon } from '../Icon/Icon'

interface ScreenProps extends BoxProps {
  children: React.ReactNode
  scrollable?: boolean
  boxProps?: Omit<
    BoxProps,
    | 'backgroundColor'
    | 'bg'
    | 'paddingTop'
    | 'paddingBottom'
    | 'paddingVertical'
  >
  canGoBack?: boolean
  noPaddingHorizontal?: boolean
}

export const DEFAULT_PADDING_HORIZONTAL: keyof Theme['spacing'] = 's32'

export function Screen({
  children,
  scrollable = false,
  canGoBack,
  style,
  noPaddingHorizontal = false,
  ...boxProps
}: ScreenProps) {
  const { bottom, top } = useAppSafeArea()
  const { colors } = useAppTheme()

  const navigation = useNavigation()

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={{ backgroundColor: colors.backgroundColor, flex: 1 }}>
        <Box
          paddingHorizontal={
            noPaddingHorizontal ? undefined : DEFAULT_PADDING_HORIZONTAL
          }
          flex={1}
          style={[{ paddingTop: top, paddingBottom: bottom }, style]}
          {...boxProps}>
          {canGoBack && (
            <Box
              height={60}
              paddingHorizontal={
                noPaddingHorizontal ? DEFAULT_PADDING_HORIZONTAL : undefined
              }
              justifyContent="center">
              <Icon
                name="arrowLeft"
                size={32}
                onPress={() => navigation.goBack()}
              />
            </Box>
          )}
          {children}
        </Box>
      </View>
    </KeyboardAvoidingView>
  )
}
