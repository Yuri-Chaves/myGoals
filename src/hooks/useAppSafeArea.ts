import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useAppTheme } from './useAppTheme'

export function useAppSafeArea() {
  const { top, right, bottom, left } = useSafeAreaInsets()
  const { spacing } = useAppTheme()
  return {
    top: Math.max(top, spacing.s24),
    right: Math.max(right, spacing.s16),
    bottom: Math.max(bottom, spacing.s10),
    left: Math.max(left, spacing.s16),
  }
}
