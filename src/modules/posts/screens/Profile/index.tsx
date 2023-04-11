import { View, Image, Alert, Switch } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import styled from 'styled-components/native'
import Header from '@shared/common/components/Header'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootPostsParamsList } from '@modules/posts/routes'

import * as AuthenticationActions from '@shared/store/authentication/actions'
import { lighten } from 'polished'
import { Text } from '@shared/common/components/Text'
import { connect } from 'react-redux'
import { ApplicationState } from '@shared/store'
import { Dispatch, bindActionCreators } from 'redux'
import { AuthenticationState } from '@shared/store/authentication/types'
import Spacer from '@shared/common/components/Spacer'
import { Feather } from '@expo/vector-icons'
import Touchable from '@shared/common/components/Touchable'
import { useCallback } from 'react'
import { useTheme } from '@shared/hooks/theme'

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.palette.colors.red};
  font-size: ${({ theme }) => theme.screen.rem(1.4, true)}px;
`

const Container = styled(View)`
  flex: 1;
`

export const UserAvatar = styled(Image)`
  width: ${({ theme }) => theme.screen.rem(7)}px;
  height: ${({ theme }) => theme.screen.rem(7)}px;
  border-radius: ${({ theme }) => theme.screen.rem(4.5)}px;

  border-width: 2px;
  border-style: solid;
  border-color: ${({ theme }) => lighten(0.4, theme.palette.colors.main)};

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`

const Row = styled(View)`
  align-items: center;
`

const SwitchContainer = styled(View)`
  width: 100%;
  flex-direction: row-reverse;
`

export const Body = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.palette.colors.background};
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.screen.rem(2)}px
    ${({ theme }) => theme.screen.rem(0.8)}px;
`

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

  console.log(theme.palette.colors)

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
