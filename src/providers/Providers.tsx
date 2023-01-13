import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { NativeBaseProvider } from 'native-base'
import { ReactNode } from 'react'
import { StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import store, { persistor } from '../store'
import { NotificationsProvider } from './NotificatedProvider'

import { AppLoading } from '~components'
import { theme, nativeBaseConfig } from '~constants'
import { useAppStateActive } from '~hooks'
import { colorModeManager } from '~services'
import { checkForUpdates } from '~utils'

export const Providers = ({ children }: { children: ReactNode }): JSX.Element => {
  useAppStateActive(checkForUpdates, false)

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NativeBaseProvider
          theme={theme}
          colorModeManager={colorModeManager}
          config={nativeBaseConfig}
        >
          {/* NativeBaseProvider includes SafeAreaProvider so that we don't have to include it in a root render tree */}
          {/* @ts-expect-error: error comes from a react-native-notificated library which doesn't have declared children in types required in react 18 */}
          <NotificationsProvider>
            <AppLoading>
              <GestureHandlerRootView style={styles.gestureHandlerRootView}>
                <BottomSheetModalProvider>{children}</BottomSheetModalProvider>
              </GestureHandlerRootView>
            </AppLoading>
          </NotificationsProvider>
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  )
}

const styles = StyleSheet.create({
  gestureHandlerRootView: {
    flex: 1,
  },
})
