import styled from 'styled-components/native'
import { Text } from '@shared/common/components/Text'

export const Container = styled.View`
  flex: 1;
`

export const Body = styled.View`
  height: 100%;
  background: ${({ theme }) => theme.palette.colors.primary};
  align-items: center;
  padding: ${({ theme }) => theme.screen.rem(1.5)}px;
`

export const Content = styled.View`
  align-items: center;
`

export const Footer = styled.View`
  width: 100%;
  margin-top: ${({ theme }) => theme.screen.rem(6)}px;
`

export const TitleContainer = styled.View`
  margin: ${({ theme }) => theme.screen.rem(2)}px 0;
`

export const Title = styled(Text)`
  font-size: ${({ theme }) => theme.screen.rem(1.875, true)}px;
  text-align: center;
  margin-top: ${({ theme }) => theme.screen.rem(2.5)}px;
`

export const Form = styled.View`
  width: 100%;
`
