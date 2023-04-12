import styled from 'styled-components/native'
import { View, FlatListProps, FlatList } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import Constants from 'expo-constants'

import { Text } from '@shared/common/components/Text'
import { PostProps } from '@modules/posts/components/Post'

const { statusBarHeight } = Constants

export const Container = styled(View)`
  flex: 1;
`

export const Notification = styled(View)`
  height: ${({ theme }) => theme.screen.rem(1)}px;
  width: ${({ theme }) => theme.screen.rem(1)}px;
  border-radius: ${({ theme }) => theme.screen.rem(0.5)}px;

  justify-content: center;
  align-items: center;

  position: absolute;
  top: -10px;
  left: 10px;

  background: ${({ theme }) => theme.palette.colors.red};
`

export const NewPostButton = styled(RectButton)`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.colors.main};
  position: absolute;
  bottom: 13px;
  right: 22px;
`

export const Body = styled.View`
  height: 100%;
  background: ${({ theme }) => theme.palette.colors.background};
  align-items: center;
  padding: 0 ${({ theme }) => theme.screen.rem(0.8)}px;
`

export const Header = styled(View)`
  padding: ${({ theme }) => theme.screen.rem(1) + statusBarHeight}px
    ${({ theme }) => theme.screen.rem(0.8)}px
    ${({ theme }) => theme.screen.rem(1)}px;

  flex-direction: row;
  justify-content: space-between;

  background-color: ${({ theme }) => theme.palette.colors.main};
`

export const HeaderWelcomeText = styled(Text)`
  font-size: ${({ theme }) => theme.screen.rem(2, true)}px;
`

export const HeaderWelcomeTextEmphasized = styled(HeaderWelcomeText)`
  color: ${({ theme }) => theme.palette.colors.texts.strong};
`

export const ButtonsContainer = styled.View`
  flex-direction: row;
  align-items: center;
`

export const PostsList = styled(
  FlatList as new (props: FlatListProps<PostProps>) => FlatList<PostProps>,
).attrs(({ theme }) => ({
  showsVerticalScrollIndicator: false,
}))`
  width: 100%;
`
