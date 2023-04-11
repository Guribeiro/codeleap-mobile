import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import styled from 'styled-components/native'
import Header from '@shared/common/components/Header'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootPostsParamsList } from '@modules/posts/routes'
import { ptBR } from 'date-fns/locale'

import PostItem from '@modules/posts/components/Post'

import { PostsList } from '../Feed/styles'
import { useLikes } from '@shared/hooks/likes'
import { useTheme } from '@shared/hooks/theme'
import { formatDistance } from 'date-fns'
import { useMemo } from 'react'

const Container = styled(View)`
  flex: 1;
`

export const Body = styled.View`
  height: 100%;
  background: ${({ theme }) => theme.palette.colors.background};
  align-items: center;
  padding: ${({ theme }) => theme.screen.rem(0.8)}px;
`

type LikesScreenProps = NativeStackNavigationProp<RootPostsParamsList, 'Likes'>

const Likes = (): JSX.Element => {
  const { goBack } = useNavigation<LikesScreenProps>()
  const { theme } = useTheme()

  const { likes } = useLikes()

  const likesFormatted = useMemo(() => {
    return likes.map((post) => {
      const now = new Date()
      const post_created_datetime = new Date(post.created_datetime)

      const created_datetime_distance = formatDistance(
        post_created_datetime,
        now,
        { addSuffix: true, locale: ptBR },
      )

      return {
        ...post,
        created_datetime_distance,
      }
    })
  }, [likes])

  return (
    <Container>
      <Header title="My likes" onGoback={goBack} />
      <Body>
        <PostsList
          data={likesFormatted}
          renderItem={({ item }) => <PostItem post={item} />}
          keyExtractor={(item) => String(item.id)}
          onEndReachedThreshold={0.7}
          scrollEventThrottle={16}
          ListFooterComponent={<View style={{ height: theme.screen.rem(8) }} />}
        />
      </Body>
    </Container>
  )
}

export default Likes
