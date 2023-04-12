import { useCallback } from 'react'
import { Alert, Switch } from 'react-native'
import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { RootPostsParamsList } from '@modules/posts/routes'

import { ApplicationState } from '@shared/store'
import * as AuthenticationActions from '@shared/store/authentication/actions'
import { AuthenticationState } from '@shared/store/authentication/types'
import { useTheme } from '@shared/hooks/theme'
import Spacer from '@shared/common/components/Spacer'
import Header from '@shared/common/components/Header'
import { Text } from '@shared/common/components/Text'
import { Icon } from '@shared/common/components/Icon'
import Touchable from '@shared/common/components/Touchable'

import { Container, Body, SwitchContainer, Row, UserAvatar } from './styles'

type LikesScreenProps = NativeStackNavigationProp<RootPostsParamsList, 'Likes'>

interface StateProps {
  authentication: AuthenticationState
}

interface DispatchProps {
  logoutRequest(): void
}

interface OwnProps {}

type ProfileProps = StateProps & DispatchProps & OwnProps

const Profile = ({
  authentication,
  logoutRequest,
}: ProfileProps): JSX.Element => {
  const { goBack } = useNavigation<LikesScreenProps>()
  const { theme, changeTheme } = useTheme()

  const {
    data: { username },
  } = authentication

  const handleLogout = useCallback(() => {
    Alert.alert('Logout', 'Are you sure you want to leave now?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      { text: 'OK', onPress: () => logoutRequest() },
    ])
  }, [logoutRequest])

  const handleChangeTheme = () => {
    const newTheme = theme.palette.title === 'dark' ? 'light' : 'dark'

    changeTheme({ themeName: newTheme })
  }

  return (
    <Container>
      <Header title="My profile" onGoback={goBack} />
      <Body>
        <SwitchContainer>
          <Switch
            value={theme.palette.title === 'light'}
            onChange={handleChangeTheme}
          />
        </SwitchContainer>
        <Row>
          <UserAvatar source={{ uri: 'https://i.pravatar.cc/300' }} />
          <Spacer size={32} />
          <Text>@{username}</Text>
        </Row>

        <Row>
          <Touchable onPress={handleLogout}>
            <Icon size={16} name="power" />
          </Touchable>
        </Row>
      </Body>
    </Container>
  )
}

const mapStateToProps = ({ authentication }: ApplicationState) => ({
  authentication,
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(AuthenticationActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
