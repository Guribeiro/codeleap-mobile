import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  background-color: ${({ theme }) => theme.palette.colors.primary};
`
