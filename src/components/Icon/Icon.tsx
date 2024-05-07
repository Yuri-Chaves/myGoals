import React from 'react'
import { Pressable } from 'react-native'

import { useAppTheme } from '@hooks'
import * as icons from '@icons'
import { ThemeColors } from '@theme'

export interface IconBase {
  size?: number
  color?: string
}

interface Props {
  name: IconName
  size?: number
  color?: ThemeColors
  onPress?: () => void
}

export function Icon({
  name,
  size,
  color = 'backgroundContrast',
  onPress,
}: Props) {
  const { colors } = useAppTheme()
  const SVGIcon = iconRegistry[name]
  if (onPress) {
    return (
      <Pressable onPress={onPress} hitSlop={10}>
        <SVGIcon size={size} color={colors[color]} />
      </Pressable>
    )
  }
  return <SVGIcon size={size} color={colors[color]} />
}

const iconRegistry = {
  // Use Icon from Assets
	teste: icons.Teste,
  arrowLeft: icons.ArrowLeft,
  close: icons.Close,
  currency: icons.Currency,
  minus: icons.Minus,
  plus: icons.Plus,
  rename: icons.Rename,
  renameBox: icons.RenameBox,
  renameBoxOutline: icons.RenameBoxOutline,
  renameOutline: icons.RenameOutline,
  textbox: icons.Textbox,
}

type IconType = typeof iconRegistry
export type IconName = keyof IconType
