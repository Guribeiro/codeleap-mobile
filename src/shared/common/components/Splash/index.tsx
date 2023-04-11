/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-expressions */
import React, { useCallback, useEffect } from 'react'
import {
  runOnJS,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import { RootSplashParamsList } from '@shared/routes/splash.routes'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { LogoImage } from '@modules/authentication/screens/Welcome/styles'
import { Container } from './styles'

import Ring from './ring'

type SplashScreenProps = NativeStackNavigationProp<
  RootSplashParamsList,
  'Splash'
>

const Splash = (): JSX.Element => {
  const { navigate } = useNavigation<SplashScreenProps>()
  const splashAnimation = useSharedValue(0)

  const startApp = useCallback(() => {
    navigate('App')
  }, [navigate])

  useEffect(() => {
    let mounted = true

    splashAnimation.value = withTiming(50, { duration: 1000 }, () => {
      if (mounted) {
        ('worklet')
        runOnJS(startApp)()
      }
    })

    return () => {
      mounted = false
    }
  }, [splashAnimation, startApp])

  return (
    <Container>
      <Ring delay={0} />
      <Ring delay={500} />
      <Ring delay={1000} />
      <Ring delay={1500} />
      <LogoImage
        source={{
          uri: 'https://codeleap.co.uk/static/838fbf40bc335c2ffd2ea5ee19ed3baa/f6c84/codeleap_logo_white.webp',
        }}
      />

    </Container>
  )
}

export default Splash
