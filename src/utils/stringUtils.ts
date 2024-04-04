export function toCurrencyValue(
  value: string | number,
  returnZeros?: boolean,
): string {
  if (typeof value === 'number') {
    value = value.toString()
  }
  value = value.replace(/\D/g, '')
  value = (+value).toString()
  value = value.replace(/(\d)(\d{2})$/, '$1,$2')
  value = value.replace(/(?=(\d{3})+(\D))\B/g, '.')
  if (value === '0') {
    if (returnZeros) {
      return '00,00'
    }
    return ''
  }
  if (value.length === 4) {
    return `0${value}`
  }
  if (value.length === 2) {
    return `00,${value}`
  }
  if (value.length === 1) {
    return `00,0${value}`
  }
  return value
}

export function toNameString(value: string) {
  value = value.toLowerCase()
  const arr = value.split(' ')
  for (var i = 0; i < arr.length; i++) {
    const word = arr[i].trim()
    arr[i] = word.charAt(0).toUpperCase() + word.slice(1)
  }
  const name = arr.join(' ')
  return name
}

export function currencyStringToNumber(currency: string): number {
  currency = currency.replace(/\D/g, '')
  return +currency
}
