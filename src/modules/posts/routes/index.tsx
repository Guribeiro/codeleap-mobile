import { createNativeStackNavigator } from '@react-navigation/native-stack'
import styled from 'styled-components/native'
import { useTheme } from '@shared/hooks/theme'

import Feed from '../screens/Feed'
import Likes from '../screens/Likes'
import Profile from '../screens/Profile'

export type RootPostsParamsList = {
  Feed: undefined
  Likes: undefined
  Profile: undefined
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
        <Screen name="Profile" component={Profile} />
      </Navigator>
    </Container>
  )
}

export default PostsRoutes
