import { Post } from '@shared/store/posts/types'

import AsyncStorage from '@react-native-async-storage/async-storage'

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useMemo,
} from 'react'
import { ErrorResponse } from '@shared/store/authentication/sagas'
import Toast from 'react-native-toast-message'

interface LikesContextData {
  likes: Post[]
  addLike(post: Post): void
  removeLike(post: Post): void
}

const LikesContext = createContext<LikesContextData>({} as LikesContextData)

interface LikesProviderProps {
  children: ReactNode
}

const LIKES_STORAGE_KEY = '@codeleap/likes'

const LikeProvider = ({ children }: LikesProviderProps): JSX.Element => {
  const [likes, setLikes] = useState<Post[]>([])

  const addLike = (post: Post) => {
    setLikes((prev) => [...prev, post])
  }

  const removeLike = (post: Post) => {
    setLikes((prev) => prev.filter((postLiked) => postLiked.id !== post.id))
  }

  useEffect(() => {
    async function updateLikesStoraged() {
      try {
        await AsyncStorage.setItem(LIKES_STORAGE_KEY, JSON.stringify(likes))
      } catch (error) {
        const { message } = error as ErrorResponse
        Toast.show({
          type: 'error',
          text1: 'Opss! somenthing went wrong',
          text2: message,
        })
      }
    }
    updateLikesStoraged()
  }, [likes])

  useEffect(() => {
    async function loadLikesStoraged() {
      try {
        const storagedLikes = await AsyncStorage.getItem(LIKES_STORAGE_KEY)

        if (storagedLikes) {
          setLikes(JSON.parse(storagedLikes))
        }
      } catch (error) {
        const { message } = error as ErrorResponse
        Toast.show({
          type: 'error',
          text1: 'Opss! somenthing went wrong',
          text2: message,
        })
      }
    }
    loadLikesStoraged()
  }, [])

  const value = useMemo(() => {
    return {
      likes,
      addLike,
      removeLike,
    }
  }, [likes])

  return <LikesContext.Provider value={value}>{children}</LikesContext.Provider>
}

function useLikes(): LikesContextData {
  const context = useContext(LikesContext)

  if (!context) {
    throw new Error('useLikes should be used within a LikeProvider componenet')
  }

  return context
}

export { useLikes, LikeProvider }
