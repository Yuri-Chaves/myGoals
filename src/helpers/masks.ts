import { toCurrencyValue, toNameString } from '@utils'

import { TMasks } from '.'

export function _onApplyMask(value: string, mask?: TMasks): string {
  if (mask) {
    if (mask === 'currency') {
      return toCurrencyValue(value)
    }
    if (mask === 'name') {
      return toNameString(value)
    }
  }
  return value
}
