import Feather from '@expo/vector-icons/Feather'
import styled, { css } from 'styled-components/native'

interface IconProps {
  active?: boolean
}

export const Icon = styled(Feather)<IconProps>`
  color: ${({ theme }) => theme.palette.colors.texts.light};
  font-size: ${({ theme }) => theme.screen.rem(1.2, true)}px;

  ${({ active, theme }) =>
    active &&
    css`
      color: ${theme.palette.colors.red};
    `}
`
