import { View } from 'react-native'
import styled from 'styled-components/native'

export const Container = styled(View)`
  flex: 1;
`

export const Body = styled(View)`
  height: 100%;
  background: ${({ theme }) => theme.palette.colors.background};
  align-items: center;
  padding: ${({ theme }) => theme.screen.rem(0.8)}px;
`
