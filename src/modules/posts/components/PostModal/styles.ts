import styled, { css } from 'styled-components/native'

import { View, Modal, TouchableOpacity } from 'react-native'

interface CreatePostButtonProps {
  disabed?: boolean
}

export const Container = styled(Modal)`
  border: 1px solid red;
  padding: ${({ theme }) => theme.screen.rem(2)}px;
`
export const Content = styled(View)`
  flex: 1;
  justify-content: space-between;
  background: ${({ theme }) => theme.palette.colors.background};

  padding: ${({ theme }) => theme.screen.rem(1)}px
    ${({ theme }) => theme.screen.rem(0.8)}px;
`

export const Header = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.palette.colors.background};
`

export const CreatePostButton = styled(TouchableOpacity)<CreatePostButtonProps>`
  padding: ${({ theme }) => theme.screen.rem(0.6)}px
    ${({ theme }) => theme.screen.rem(1.2)}px;
  border-radius: ${({ theme }) => theme.screen.rem(0.6)}px;
  background-color: ${({ theme }) => theme.palette.colors.main};

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.5;
    `}
`
