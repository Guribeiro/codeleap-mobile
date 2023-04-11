import { KeyboardAvoidingView, Platform } from 'react-native'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '@shared/common/components/Button'
import Spacer from '@shared/common/components/Spacer'
import { Controller, useForm, useFormState } from 'react-hook-form'
import Scroll from '@shared/common/components/Scroll'

import * as AuthenticationActions from '@shared/store/authentication/actions'

import { z } from 'zod'

import InputText from '@shared/common/components/InputText'

import Header from '@shared/common/components/Header'

import { RootSigninParamsList } from '@modules/authentication/routes/signin.routes'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { Container, Body, Footer, Form, Title, TitleContainer } from './styles'
import { ApplicationState } from '@shared/store'
import { Dispatch, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  AuthenticationState,
  LoginRequestPayload,
} from '@shared/store/authentication/types'
import { useMemo } from 'react'

type SigninScreenProps = NativeStackNavigationProp<
  RootSigninParamsList,
  'Welcome'
>

const signinSchema = z.object({
  username: z
    .string()
    .nonempty('Please, choose your username')
    .min(6, 'Username must contain at least 6 character(s)'),
})

type SigninFormData = z.infer<typeof signinSchema>

interface StateProps {
  authentication: AuthenticationState
}

interface DispatchProps {
  loginRequest(data: LoginRequestPayload): void
}

interface OwnProps {}

type SigninProps = StateProps & DispatchProps & OwnProps

const Signin = ({ authentication, loginRequest }: SigninProps): JSX.Element => {
  const { loading } = authentication
  const { goBack } = useNavigation<SigninScreenProps>()

  const { control, handleSubmit } = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
  })

  const { errors } = useFormState({
    control,
    name: 'username',
    exact: true,
  })

  const isValidInput = useMemo(() => {
    return Object.keys(errors).length > 0
  }, [errors])

  const onSubmit = ({ username }: SigninFormData) => {
    loginRequest({
      username,
    })
  }

  return (
    <Container>
      <Header title="Choose username" onGoback={goBack} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        enabled
      >
        <Scroll>
          <Body>
            <TitleContainer>
              <Title>Welcome to Codeleap network</Title>
            </TitleContainer>

            <Form>
              <Controller
                name="username"
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <InputText
                    label="username"
                    onChangeText={onChange}
                    value={value}
                    error={error?.message}
                  />
                )}
              />
              <Spacer size={16} />
            </Form>
            <Footer>
              <Button
                loading={loading}
                disabled={isValidInput}
                onPress={handleSubmit(onSubmit)}
              >
                Log in
              </Button>
            </Footer>
          </Body>
        </Scroll>
      </KeyboardAvoidingView>
    </Container>
  )
}

const mapStateToProps = ({ authentication }: ApplicationState) => ({
  authentication,
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(AuthenticationActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Signin)
