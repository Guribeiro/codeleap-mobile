import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AuthenticationRoutes from '@modules/authentication/routes'
import PostsRoutes from '@modules/posts/routes'

import { ApplicationState } from '@shared/store'

import * as AuthenticationActions from '@shared/store/authentication/actions'

import { useTheme } from '@shared/hooks/theme'
import Splash from '@shared/common/components/Splash'
import { Authentication } from '@shared/store/authentication/types'

export type RootSplashParamsList = {
  Splash: undefined
  App: undefined
}

const { Navigator, Screen } = createNativeStackNavigator<RootSplashParamsList>()

interface StateProps {
  authentication: Authentication
}

interface DispatchProps {}

interface OwnProps {}

type SplashRoutesProps = StateProps & DispatchProps & OwnProps

const SplashRoutes = ({ authentication }: SplashRoutesProps): JSX.Element => {
  const { theme } = useTheme()

  const { username } = authentication

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

      <Screen
        name="App"
        component={username ? PostsRoutes : AuthenticationRoutes}
      />
    </Navigator>
  )
}

const mapStateToProps = ({ authentication }: ApplicationState) => ({
  authentication: authentication.data,
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(AuthenticationActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SplashRoutes)
