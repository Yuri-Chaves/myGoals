import React, { ForwardedRef, useRef, useState } from 'react'
import {
  Pressable,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native'

import { TMasks, _onApplyMask } from '@helpers'
import { useAppTheme } from '@hooks'
import { ThemeColors } from '@theme'

import { ActivityIndicator } from '../ActivityIndicator/ActivityIndicator'
import { Box, BoxProps } from '../Box/Box'
import { $fontSizes, Text, TextProps, getFontFamily } from '../Text/Text'

export type TextInputRef = { handleFocus: () => void }

export interface TextInputProps extends RNTextInputProps {
  label: string
  inError?: boolean
  errorMessage?: string
  helperText?: string
  leftComponent?: React.ReactElement
  rightComponent?: React.ReactElement
  boxProps?: BoxProps
  inputTextProps?: Pick<TextProps, 'preset' | 'weight'> & {
    color?: ThemeColors
  }
  forwardRef?: ForwardedRef<TextInputRef>
  inRow?: boolean
  mask?: TMasks
  inLoading?: boolean
  /**
   * @default `aux1D`
   */
  loaderColor?: ThemeColors
}

export function TextInput({
  label,
  inError = false,
  errorMessage,
  helperText,
  leftComponent,
  rightComponent,
  boxProps,
  inputTextProps,
  forwardRef,
  inRow = false,
  mask,
  onChangeText,
  inLoading,
  loaderColor = 'green',
  ...rNTextInputProps
}: TextInputProps) {
  const { colors } = useAppTheme()
  const InputRef = useRef<RNTextInput>(null)

  const [inFocus, setInFocus] = useState(false)

  const fontFamily = getFontFamily(inputTextProps?.weight || 'bold')

  const $TextInputStyle: TextStyle = {
    padding: 0,
    flexGrow: 1,
    flexShrink: 1,
    fontFamily: fontFamily,
    ...$fontSizes[inputTextProps?.preset || 'FS-14|LH-17'],
    height: 20,
    color: colors[inputTextProps?.color || 'backgroundContrast'],
  }

  const $containerStyle: ViewStyle = {
    flexGrow: 1,
    borderWidth: 2,
    borderRadius: 4,
    borderColor: inError ? colors.red : inFocus ? colors.green : colors.grey3,
    height: 48,
    maxHeight: 48,
    justifyContent: 'center',
    backgroundColor:
      rNTextInputProps.editable === false ? colors.grey3 : undefined,
    position: 'relative',
  }
  const $pressableStyle: ViewStyle = {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: leftComponent ? 8 : 16,
    paddingRight: rightComponent ? 8 : 16,
  }

  function handleFocus() {
    setInFocus(true)
    InputRef.current?.focus()
  }

  if (forwardRef) {
    const PressableRef = forwardRef as React.MutableRefObject<{
      handleFocus: () => void
    } | null>
    PressableRef.current = {
      handleFocus,
    }
  }

  function handleChangeText(value: string) {
    const maskedText = _onApplyMask(value, mask)

    onChangeText && onChangeText(maskedText)
  }

  return (
    <Box flexDirection="row" flex={inRow ? 1 : undefined}>
      <Box flexShrink={1} flexGrow={1}>
        <Box {...boxProps} style={$containerStyle} flexShrink={1} flexGrow={1}>
          <Pressable
            onPress={
              rNTextInputProps.editable === false ? undefined : handleFocus
            }
            style={$pressableStyle}>
            <Box
              position="absolute"
              top={inFocus || rNTextInputProps.value ? 0 : 10}
              left={leftComponent ? 35 : 16}>
              <Text
                numberOfLines={1}
                preset={
                  inFocus || rNTextInputProps.value
                    ? 'FS-12|LH-14'
                    : 'FS-16|LH-22'
                }
                color={inFocus ? 'green' : 'grey5'}
                weight="regular">
                {label}
              </Text>
            </Box>
            <Box flexDirection="row">
              {leftComponent && <Box mr="s8">{leftComponent}</Box>}
              <RNTextInput
                ref={InputRef}
                placeholderTextColor={colors.grey4}
                style={$TextInputStyle}
                onChangeText={handleChangeText}
                {...rNTextInputProps}
                onFocus={e => {
                  setInFocus(true)
                  if (rNTextInputProps.onFocus) {
                    rNTextInputProps.onFocus(e)
                  }
                }}
                onBlur={e => {
                  setInFocus(false)
                  if (rNTextInputProps.onBlur) {
                    rNTextInputProps.onBlur(e)
                  }
                }}
                placeholder={inFocus ? rNTextInputProps.placeholder : ''}
              />
              {rightComponent && !inLoading && (
                <Box ml="s8">{rightComponent}</Box>
              )}
              {inLoading && (
                <Box ml="s8">
                  <ActivityIndicator color={loaderColor} />
                </Box>
              )}
            </Box>
          </Pressable>
        </Box>
        {(inError || helperText) && (
          <Text
            ml="s16"
            marginTop="s2"
            color={inError ? 'red' : 'grey5'}
            preset="FS-12|LH-14">
            {inError && errorMessage
              ? errorMessage
              : helperText
              ? helperText
              : ''}
          </Text>
        )}
      </Box>
    </Box>
  )
}
