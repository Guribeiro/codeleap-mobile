import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useTheme } from '@shared/hooks/theme'
import styled from 'styled-components/native'

import Feed from '../screens/Feed'
import Likes from '../screens/Likes'

export type RootPostsParamsList = {
  Feed: undefined
  Likes: undefined
}

const { Navigator, Screen } = createNativeStackNavigator<RootPostsParamsList>()

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.palette.colors.primary};
`

const PostsRoutes = (): JSX.Element => {
  const { theme } = useTheme()
  return (
    <Container>
      <Navigator
        initialRouteName="Feed"
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: theme.palette.colors.primary,
          },
        }}
      >
        <Screen name="Feed" component={Feed} />
        <Screen name="Likes" component={Likes} />
      </Navigator>
    </Container>
  )
}

export default PostsRoutes
