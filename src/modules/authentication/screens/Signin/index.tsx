import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootSigninParamsList } from '../../routes/signin.routes'

import InputText from '@shared/common/components/InputText'

import Button from '@shared/common/components/Button'
import { Container, Content, WelcomeText, WelcomeTextContainer } from './styles'

type WelcomeScreenProps = NativeStackNavigationProp<
  RootSigninParamsList,
  'Signin'
>

const Signin = (): JSX.Element => {
  const { navigate } = useNavigation<WelcomeScreenProps>()
  return (
    <Container>
      <Content>
        <WelcomeTextContainer>
          <WelcomeText>Welcome to CodeLeap network!</WelcomeText>
        </WelcomeTextContainer>
      </Content>
    </Container>
  )
}

export default Signin
