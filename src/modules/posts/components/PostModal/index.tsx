import { useCallback, useEffect, useState } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  ModalProps,
  Button as NativeButton,
} from 'react-native'
import { Dispatch, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Controller, useForm, useFormState } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Form } from '@modules/authentication/screens/Signin/styles'

import Scroll from '@shared/common/components/Scroll'
import Spacer from '@shared/common/components/Spacer'
import { Text } from '@shared/common/components/Text'
import InputText from '@shared/common/components/InputText'
import * as PostsActions from '@shared/store/posts/actions'
import FullScreenLoading from '@shared/common/components/FullScreenLoading'

import InputTextArea from './components/InputTextArea'

import { ApplicationState } from '@shared/store'
import { AuthenticationState } from '@shared/store/authentication/types'
import {
  PostsState,
  AddPostRequestPayload,
  UpdatePostRequestPayload,
  DeletePostRequestPayload,
  Post,
} from '@shared/store/posts/types'

import { Container, Content, CreatePostButton, Header } from './styles'

const createPostSchema = z.object({
  title: z.string().nonempty(),
  content: z.string().nonempty().max(140),
})

type CreatePostFormData = z.infer<typeof createPostSchema>

interface StateProps {
  authentication: AuthenticationState
  posts: PostsState
}

interface DispatchProps {
  addPostRequest(data: AddPostRequestPayload): void
  updatePostRequest(data: UpdatePostRequestPayload): void
  deletePostRequest(data: DeletePostRequestPayload): void
}

interface OwnProps extends ModalProps {
  onRequestClose(): void
  post?: Post
}

type PostModalProps = StateProps & DispatchProps & OwnProps

const defaultValues: CreatePostFormData = {
  title: '',
  content: '',
}

const PostModal = ({
  visible,
  onRequestClose,
  authentication,
  addPostRequest,
  updatePostRequest,
  deletePostRequest,
  post,
  posts,
  ...props
}: PostModalProps): JSX.Element => {
  const [disabled, setDisabled] = useState(true)

  const { username } = authentication.data
  const { loading } = posts

  const { control, handleSubmit, watch, reset } = useForm<CreatePostFormData>({
    resolver: zodResolver(createPostSchema),
  })

  const { errors: titleErrors } = useFormState({
    control,
    name: 'title',
    exact: true,
  })

  const { errors: contentErrors } = useFormState({
    control,
    name: 'title',
    exact: true,
  })

  const onSubmit = useCallback(
    ({ title, content }: CreatePostFormData) => {
      if (post) {
        updatePostRequest({
          id: post.id,
          title,
          content,
        })
        onRequestClose()
        return
      }
      addPostRequest({
        title,
        content,
        username,
      })

      onRequestClose()
    },
    [authentication, addPostRequest, onRequestClose, post],
  )

  useEffect(() => {
    const subscription = watch(({ title, content }) => {
      if (!title || !content) {
        setDisabled(true)
        return
      }

      const hasTitleErrors = Object.keys(titleErrors).length > 0
      const hasContentErrors = Object.keys(contentErrors).length > 0

      if (hasTitleErrors || hasContentErrors) {
        setDisabled(true)
      }

      if (!hasTitleErrors && !hasContentErrors) {
        setDisabled(false)
      }
    })
    return () => subscription.unsubscribe()
  }, [titleErrors, contentErrors, watch])

  useEffect(() => {
    if (post) {
      reset(post)
      return
    }

    reset(defaultValues)
  }, [post, reset])

  return (
    <Container visible={visible} onRequestClose={onRequestClose} {...props}>
      <Content>
        <Header>
          <NativeButton title="Cancel" onPress={onRequestClose} />
          <CreatePostButton
            disabled={disabled}
            onPress={handleSubmit(onSubmit)}
          >
            <Text>Post it</Text>
          </CreatePostButton>
        </Header>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          enabled
        >
          <Scroll>
            <Spacer size={32} />
            <Form>
              <Controller
                name="title"
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <InputText
                    label="title"
                    onChangeText={onChange}
                    value={value}
                    error={error?.message}
                    autoFocus
                  />
                )}
              />
              <Spacer size={16} />
              <Controller
                name="content"
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <InputTextArea
                    label={`What's on your mind...`}
                    onChangeText={onChange}
                    value={value}
                    error={error?.message}
                    multiline
                  />
                )}
              />
              <Spacer size={16} />
            </Form>
          </Scroll>
        </KeyboardAvoidingView>
      </Content>
      {loading && <FullScreenLoading />}
    </Container>
  )
}

const mapStateToProps = ({ authentication, posts }: ApplicationState) => ({
  authentication,
  posts,
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(PostsActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PostModal)
