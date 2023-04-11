import styled from 'styled-components/native'
import { TextInput } from 'react-native'
import { Text } from '@shared/common/components/Text'

export const Container = styled.View``

interface TextInputRowProps {
  error: boolean
}

export const InputTextContainer = styled(TextInput)`
  color: ${({ theme }) => theme.palette.colors.texts.medium};
  flex: 1;
  height: ${({ theme }) => theme.screen.rem(10.375)}px;
`

export const InputLabel = styled(Text)`
  text-transform: capitalize;
  font-family: ${({ theme }) => theme.palette.fonts.regular};
  line-height: ${({ theme }) => theme.screen.rem(1.5)}px;
`

export const TextInputRow = styled.View<TextInputRowProps>`
  flex-direction: row;
  align-items: flex-start;
  height: ${({ theme }) => theme.screen.rem(10.375)}px;
`

export const ErrorText = styled(Text)`
  padding-top: 4px;
  color: ${({ theme }) => theme.palette.colors.red};
  text-align: right;

  position: absolute;
  bottom: -24px;
  right: 0;
`
