import styled, { css } from 'styled-components/native'
import { Text as NativeText } from 'react-native'

interface TextProps {
  emphasized?: boolean
}

export const Text = styled(NativeText)<TextProps>`
  font-size: ${({ theme }) => theme.screen.rem(1, true)}px;
  font-family: ${({ theme }) => theme.palette.fonts.bold};
  color: ${({ theme }) => theme.palette.colors.texts.light};

  ${({ emphasized, theme }) =>
    emphasized &&
    css`
      color: ${theme.palette.colors.main};
    `}
`
