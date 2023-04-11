import { useCallback, useMemo, useState } from 'react'
import { Dispatch, bindActionCreators } from 'redux'
import { Alert } from 'react-native'
import { connect } from 'react-redux'

import PostModal from '../PostModal'

import { ApplicationState } from '@shared/store'
import * as PostsActions from '@shared/store/posts/actions'
import {
  DeletePostRequestPayload,
  Post,
  PostsState,
} from '@shared/store/posts/types'
import { AuthenticationState } from '@shared/store/authentication/types'

import {
  Container,
  Row,
  Header,
  Icon,
  ActionsContainer,
  LineDivider,
  Title,
  Body,
  Button,
  Content,
  Username,
  Datetime,
  Footer,
} from './styles'
import { useLikes } from '@shared/hooks/likes'

export type PostProps = Post & {
  created_datetime_distance: string
}

interface StateProps {
  posts: PostsState
  authentication: AuthenticationState
}

interface DispatchProps {
  getPostsRequest(): void
  deletePostRequest(data: DeletePostRequestPayload): void
}

interface OwnProps {
  post: PostProps
}

type PostItemProps = StateProps & DispatchProps & OwnProps

const PostItem = ({
  post,
  authentication,
  deletePostRequest,
}: PostItemProps): JSX.Element => {
  const { id, title, content, username, created_datetime_distance } = post

  const { likes, addLike, removeLike } = useLikes()
  const [postModalVisible, setPostModalVisible] = useState(false)

  const authenticatedUserOwnPost = useMemo(() => {
    return username === authentication.data.username
  }, [authentication])

  const active = useMemo(() => {
    const isLiked = likes.find((like) => like.id === id)

    return !!isLiked
  }, [likes])

  const handleLikePost = useCallback(() => {
    if (active) {
      removeLike(post)
      return
    }

    addLike(post)
  }, [likes, active])

  const onDelete = useCallback(() => {
    Alert.alert('Delete post', 'Are you sure you want to delete this post?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      { text: 'OK', onPress: () => deletePostRequest({ id }) },
    ])
  }, [post, deletePostRequest])

  return (
    <Container>
      <Header>
        <Title>{title}</Title>
        {authenticatedUserOwnPost && (
          <ActionsContainer>
            <Button onPress={onDelete}>
              <Icon name="trash" />
            </Button>
            <LineDivider />
            <Button onPress={() => setPostModalVisible(true)}>
              <Icon name="edit" />
            </Button>
          </ActionsContainer>
        )}
      </Header>
      <Body>
        <Row>
          <Username>@{username}</Username>
          <Datetime>{created_datetime_distance}</Datetime>
        </Row>
        <Content>{content}</Content>
      </Body>
      <Footer>
        <Button onPress={handleLikePost}>
          <Icon name="heart" active={active} />
        </Button>
      </Footer>

      <PostModal
        visible={postModalVisible}
        animationType="slide"
        onRequestClose={() => setPostModalVisible(false)}
        post={post}
        presentationStyle="pageSheet"
      />
    </Container>
  )
}

const mapStateToProps = ({ posts, authentication }: ApplicationState) => ({
  authentication,
  posts,
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(PostsActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PostItem)
