import styled from 'styled-components/native'
import { View, Image } from 'react-native'

export const Container = styled(View)`
  flex: 1;
`

export const UserAvatar = styled(Image)`
  width: ${({ theme }) => theme.screen.rem(7)}px;
  height: ${({ theme }) => theme.screen.rem(7)}px;
  border-radius: ${({ theme }) => theme.screen.rem(4.5)}px;
`

export const Row = styled(View)`
  align-items: center;
`

export const SwitchContainer = styled(View)`
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
