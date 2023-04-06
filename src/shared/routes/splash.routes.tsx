import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { useTheme } from '@shared/hooks/theme'
import Splash from '@shared/common/components/Splash'
import AuthenticationRoutes from '@modules/authentication/routes'
import { useAuthentication } from '@modules/authentication/hooks/authentication'

export type RootSplashParamsList = {
  Splash: undefined
  App: undefined
}

const { Navigator, Screen } = createNativeStackNavigator<RootSplashParamsList>()

const SplashRoutes = (): JSX.Element => {
  const { username } = useAuthentication()
  const { theme } = useTheme()

  return (
    <Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.palette.colors.primary,
        },
      }}
    >
      {!!username && <Screen name="Splash" component={Splash} />}

      {/* <Screen
        name="App"
        component={username ? LocationRoutes : AuthenticationRoutes}
      /> */}
      <Screen name="App" component={AuthenticationRoutes} />
    </Navigator>
  )
}

export default SplashRoutes
