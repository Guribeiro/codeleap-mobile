import { useCallback } from 'react'
import { Alert, Switch, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import { useNavigation } from '@react-navigation/native'

import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { RootPostsParamsList } from '@modules/posts/routes'

import { ApplicationState } from '@shared/store'
import * as AuthenticationActions from '@shared/store/authentication/actions'
import {
  AuthenticationState,
  UpdateAvatarRequestPayload,
} from '@shared/store/authentication/types'
import { useTheme } from '@shared/hooks/theme'
import Spacer from '@shared/common/components/Spacer'
import Header from '@shared/common/components/Header'
import { Text } from '@shared/common/components/Text'
import { Icon } from '@shared/common/components/Icon'
import Touchable from '@shared/common/components/Touchable'

import FullScreenLoading from '@shared/common/components/FullScreenLoading'

import { Container, Body, SwitchContainer, Row, UserAvatar } from './styles'
import { PickerOptions, launchImageLibrary } from '@shared/utils/imagePicker'

type LikesScreenProps = NativeStackNavigationProp<RootPostsParamsList, 'Likes'>

interface StateProps {
  authentication: AuthenticationState
}

interface DispatchProps {
  logoutRequest(): void
  updateAvatarRequest(data: UpdateAvatarRequestPayload): void
}

interface OwnProps {}

type ProfileProps = StateProps & DispatchProps & OwnProps

const Profile = ({
  authentication,
  logoutRequest,
  updateAvatarRequest,
}: ProfileProps): JSX.Element => {
  const { goBack } = useNavigation<LikesScreenProps>()
  const { theme, changeTheme } = useTheme()

  const {
    data: { username, avatar },
    loading,
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

  const handleLaunchMediaLibrary = useCallback(async (): Promise<void> => {
    const imagePickerResult = await launchImageLibrary({} as PickerOptions)

    if (imagePickerResult.canceled) return

    const [image] = imagePickerResult.assets

    updateAvatarRequest({
      image: image.uri,
      username,
    })
  }, [username])

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
          <TouchableOpacity onPress={handleLaunchMediaLibrary}>
            <UserAvatar source={{ uri: avatar }} />
          </TouchableOpacity>
          <Spacer size={32} />
          <Text>@{username}</Text>
        </Row>

        <Row>
          <Touchable style={{ padding: 16 }} onPress={handleLogout}>
            <Icon size={16} name="power" />
          </Touchable>
        </Row>
      </Body>

      {loading && <FullScreenLoading />}
    </Container>
  )
}

const mapStateToProps = ({ authentication }: ApplicationState) => ({
  authentication,
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(AuthenticationActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
