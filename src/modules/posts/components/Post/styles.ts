import { View, TouchableOpacity } from 'react-native'
import styled, { css } from 'styled-components/native'
import Feather from '@expo/vector-icons/Feather'
import { Text } from '@shared/common/components/Text'
import Animated from 'react-native-reanimated'

interface IconProps {
  active?: boolean
}

export const Container = styled(Animated.View)`
  border: 0.5px solid #cccc;
  margin: ${({ theme }) => theme.screen.rem(0.4)}px 0;
`

export const Row = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
export const Header = styled(Row)`
  padding: ${({ theme }) => theme.screen.rem(0.4)}px;
`

export const Icon = styled(Feather)<IconProps>`
  color: ${({ theme }) => theme.palette.colors.white};
  font-size: ${({ theme }) => theme.screen.rem(1.2, true)}px;

  ${({ active, theme }) =>
    active &&
    css`
      color: ${theme.palette.colors.red};
    `}
`

export const ActionsContainer = styled(View)`
  flex-direction: row;
  align-items: center;
`

export const LineDivider = styled(View)`
  width: 1px;
  height: 8px;
  background: ${({ theme }) => theme.palette.colors.shapes.light};
`

export const Title = styled(Text)`
  font-size: ${({ theme }) => theme.screen.rem(1.2)}px;
`
export const Button = styled(TouchableOpacity)`
  padding: 0 ${({ theme }) => theme.screen.rem(0.4)}px;
`
export const Body = styled(View)`
  padding: ${({ theme }) => theme.screen.rem(0.4)}px;
`

export const Username = styled(Text)`
  color: ${({ theme }) => theme.palette.colors.texts.medium};
`
export const Datetime = styled(Text)`
  color: ${({ theme }) => theme.palette.colors.texts.light};
  font-size: ${({ theme }) => theme.screen.rem(0.6)}px;
`
export const Content = styled(Text)`
  margin-top: ${({ theme }) => theme.screen.rem(0.4)}px;
`
export const Footer = styled(Row)`
  justify-content: flex-end;
  padding: ${({ theme }) => theme.screen.rem(0.4)}px 0;
`
