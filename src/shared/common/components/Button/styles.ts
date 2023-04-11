import styled, { css } from 'styled-components/native'
import { TouchableOpacity } from 'react-native'

type ContainerProps = {
  backgroundColor?: string
  disabled?: boolean
}

export const Container = styled(TouchableOpacity)<ContainerProps>`
  width: 100%;
  border-radius: ${({ theme }) => theme.screen.rem(0.3125)}px;
  justify-content: center;
  align-items: center;

  padding: ${({ theme }) => theme.screen.rem(1)}px;
  background-color: ${({ theme, backgroundColor }) =>
    backgroundColor || theme.palette.colors.main};

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.5;
    `}
`

export const ButtonText = styled.Text`
  font-family: ${({ theme }) => theme.palette.fonts.regular};
  font-size: ${({ theme }) => theme.screen.rem(1, true)}px;
  color: ${({ theme }) => theme.palette.colors.shapes.light};
`
