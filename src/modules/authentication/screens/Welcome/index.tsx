import { useTheme } from '@shared/hooks/theme'
import Button from '@shared/common/components/Button'

import { RootSigninParamsList } from '@modules/authentication/routes/signin.routes'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
// import Logo from '../../assets/logo.svg'

import {
  Container,
  Body,
  LogoImage,
  Content,
  Title,
  SigninText,
  Footer,
  FooterWrapper,
} from './styles'

type WelcomeScreenProps = NativeStackNavigationProp<
  RootSigninParamsList,
  'Signin'
>

const Welcome = (): JSX.Element => {
  const { theme } = useTheme()
  const { navigate } = useNavigation<WelcomeScreenProps>()
  return (
    <Container>
      <Body>
        <Content>
          <LogoImage
            source={{
              uri: 'https://codeleap.co.uk/static/838fbf40bc335c2ffd2ea5ee19ed3baa/f6c84/codeleap_logo_white.webp',
            }}
          />

          <Title>Share what is on your mind</Title>
        </Content>
        <SigninText>Let people know what you are thinking about</SigninText>
      </Body>
      <Footer>
        <FooterWrapper>
          <Button
            onPress={() => navigate('Signin')}
            backgroundColor={theme.palette.colors.primary}
          >
            Log in
          </Button>
        </FooterWrapper>
      </Footer>
    </Container>
  )
}

export default Welcome
