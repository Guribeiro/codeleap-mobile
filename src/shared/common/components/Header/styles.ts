import styled from 'styled-components/native'
import { Text } from '../Text'
import { Feather } from '@expo/vector-icons'

export const Container = styled.View`
  background: ${({ theme }) => theme.palette.colors.main};
  width: 100%;
  height: ${({ theme }) => theme.screen.rem(7.625)}px;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: ${({ theme }) => theme.screen.rem(1.1875)}px;
`

export const Content = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
`

export const Button = styled.TouchableOpacity`
  position: absolute;
  left: ${({ theme }) => theme.screen.rem(1.5)}px;
`

export const Icon = styled(Feather)`
  font-size: ${({ theme }) => theme.screen.rem(1.5, true)}px;
  color: ${({ theme }) => theme.palette.colors.white};
`

export const Title = styled(Text)`
  font-family: ${({ theme }) => theme.palette.fonts.regular};
  font-size: ${({ theme }) => theme.screen.rem(1.125)}px;
  color: ${({ theme }) => theme.palette.colors.white};
  width: 100%;
  text-align: center;
`
