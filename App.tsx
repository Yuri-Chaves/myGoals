import React from 'react'

import { ThemeProvider } from '@shopify/restyle'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { GlobalForm } from '@components'
import { Router } from '@routes'
import { DBProvider } from '@services'
import { theme } from '@theme'

function App(): React.JSX.Element {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider theme={theme}>
          <DBProvider>
            <Router />
            <GlobalForm />
          </DBProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}

export default App
