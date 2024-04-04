export * from './masks'

enum Masks {
  currency = 'currency',
  name = 'name',
}

export type TMasks = keyof typeof Masks
