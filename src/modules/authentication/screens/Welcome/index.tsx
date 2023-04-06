import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootSigninParamsList } from '../../routes/signin.routes'

import Button from '@shared/common/components/Button'
import Logo from '@shared/common/components/Logo'

import {
  Container,
  Content,
  WelcomeText,
  WelcomeTextContainer,
  Footer,
  ButtonContainer,
} from './styles'

type WelcomeScreenProps = NativeStackNavigationProp<
  RootSigninParamsList,
  'Welcome'
>

const Welcome = (): JSX.Element => {
  const { navigate } = useNavigation<WelcomeScreenProps>()
  return (
    <Container>
      <Content>
        <WelcomeTextContainer>
          <WelcomeText>Codeleap</WelcomeText>
        </WelcomeTextContainer>

        <ButtonContainer>
          <Button onPress={() => navigate('Signin')}>get started</Button>
        </ButtonContainer>
      </Content>
    </Container>
  )
}

export default Welcome
