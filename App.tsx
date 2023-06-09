/* eslint-disable camelcase */
import 'react-native-gesture-handler'
import { useCallback, useEffect, useState } from 'react'
import Toast from 'react-native-toast-message'
import { ScreenProvider } from 'responsive-native'
import { Provider } from 'react-redux'
import { loadAsync } from 'expo-font'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import * as SplashScreen from 'expo-splash-screen'
import {
  InriaSerif_300Light,
  InriaSerif_400Regular,
  InriaSerif_700Bold,
} from '@expo-google-fonts/inria-serif'

import AppProvider from '@shared/hooks'
import Routes from '@shared/routes'
import store from '@shared/store'

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false)

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync()

        loadAsync({
          InriaSerif_300Light,
          InriaSerif_400Regular,
          InriaSerif_700Bold,
        })
        await new Promise((resolve) => setTimeout(resolve, 4000))
      } catch (e) {
        console.log(e)
      } finally {
        setAppIsReady(true)
      }
    }

    prepare()
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync()
    }
  }, [appIsReady])

  if (!appIsReady) return null
  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <ScreenProvider baseFontSize={16}>
        <Provider store={store}>
          <AppProvider>
            <Routes />
            <Toast />
          </AppProvider>
        </Provider>
      </ScreenProvider>
    </SafeAreaProvider>
  )
}
