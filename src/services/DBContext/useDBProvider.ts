import { useContext } from 'react'

import { DBContext } from './DBProvider'

export function useDBProvider() {
  const context = useContext(DBContext)
  if (!context) {
    throw new Error('useDBProvider must be used within a DBProviderProvider')
  }
  return context
}
