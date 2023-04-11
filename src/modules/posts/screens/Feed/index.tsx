import { useCallback, useEffect, useMemo, useState } from 'react'

import { View, ActivityIndicator, RefreshControl } from 'react-native'
import { Dispatch, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

import { formatDistance } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { ApplicationState } from '@shared/store'
import * as PostsActions from '@shared/store/posts/actions'
import {
  FetchMorePostsRequestPayload,
  PostsState,
} from '@shared/store/posts/types'

import Touchable from '@shared/common/components/Touchable'
import Spacer from '@shared/common/components/Spacer'
import { useTheme } from '@shared/hooks/theme'

import { RootPostsParamsList } from '@modules/posts/routes'
import PostItem from '@modules/posts/components/Post'
import PostModal from '@modules/posts/components/PostModal'

import {
  Container,
  NewPostButton,
  Header,
  Body,
  ButtonsContainer,
  HeaderWelcomeText,
  HeaderWelcomeTextEmphasized,
  Icon,
  PostsList,
} from './styles'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

interface StateProps {
  posts: PostsState
}

interface DispatchProps {
  getPostsRequest(): void
  fetchMorePostsRequest(data: FetchMorePostsRequestPayload): void
}

interface OwnProps {}

type FeedProps = StateProps & DispatchProps & OwnProps

type FeedScreenProps = NativeStackNavigationProp<RootPostsParamsList, 'Feed'>

const Feed = ({
  posts,
  getPostsRequest,
  fetchMorePostsRequest,
}: FeedProps): JSX.Element => {
  const { theme } = useTheme()
  const { data, loading } = posts
  const { results, next } = data

  const { navigate } = useNavigation<FeedScreenProps>()

  const [postModalVisible, setPostModalVisible] = useState(false)

  const resultsFormatted = useMemo(() => {
    return results?.map((post) => {
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
  }, [results])

  const onRequestClose = () => {
    setPostModalVisible(false)
  }

  const onEndReached = useCallback(() => {
    if (!next) return

    fetchMorePostsRequest({
      next,
    })
  }, [next])

  useEffect(() => {
    getPostsRequest()
  }, [])

  return (
    <Container>
      <Header>
        <HeaderWelcomeText>
          <HeaderWelcomeTextEmphasized>Codeleap </HeaderWelcomeTextEmphasized>
          network
        </HeaderWelcomeText>
        <ButtonsContainer>
          <Touchable>
            <Icon name="user" />
          </Touchable>
          <Spacer horizontal size={8} />
          <Touchable onPress={() => navigate('Likes')}>
            <Icon name="heart" />
          </Touchable>
        </ButtonsContainer>
      </Header>

      <Body>
        <PostsList
          data={resultsFormatted}
          renderItem={({ item }) => <PostItem post={item} />}
          keyExtractor={(item) => String(item.id)}
          onEndReachedThreshold={0.7}
          scrollEventThrottle={16}
          onEndReached={onEndReached}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => getPostsRequest()}
              tintColor={theme.palette.colors.main}
              colors={[theme.palette.colors.main]}
            />
          }
          ListFooterComponent={
            loading ? (
              <ActivityIndicator />
            ) : (
              <View style={{ height: theme.screen.rem(8) }} />
            )
          }
        />
      </Body>
      <PostModal
        visible={postModalVisible}
        animationType="slide"
        onRequestClose={() => onRequestClose()}
        presentationStyle="pageSheet"
      />
      <NewPostButton onPress={() => setPostModalVisible(true)}>
        <Icon name="plus" />
      </NewPostButton>
    </Container>
  )
}

const mapStateToProps = ({ posts }: ApplicationState) => ({
  posts,
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(PostsActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Feed)
