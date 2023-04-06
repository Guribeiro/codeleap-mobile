import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'

interface AuthenticationProviderProps {
  children: ReactNode
}

type UserNameState = string | undefined

interface UpdateUserNameProps {
  name: string
}

interface SignInProps {
  name: string
}

interface AuthenticationContextData {
  username: string | undefined
  loading: boolean
  signInLoading: boolean
  signIn(data: SignInProps): Promise<void>
  signOut(): Promise<void>
  updateUserName(data: UpdateUserNameProps): Promise<void>
}

const AuthenticationContext = createContext<AuthenticationContextData>(
  {} as AuthenticationContextData,
)

const AuthenticationProvider = ({
  children,
}: AuthenticationProviderProps): JSX.Element => {
  const [username, setUsername] = useState<UserNameState>()
  const [signInLoading, setSignInLoading] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    ;(async () => {
      const userNameStoraged = await AsyncStorage.getItem('@app-cars/username')

      if (userNameStoraged) {
        setUsername(JSON.parse(userNameStoraged))
      }
    })()
  }, [])

  const signIn = useCallback(async ({ name }: SignInProps) => {
    setSignInLoading(true)
    setUsername(name)
    await AsyncStorage.setItem('@app-cars/username', JSON.stringify(name))
    setSignInLoading(false)
  }, [])

  const updateUserName = useCallback(
    async ({ name }: UpdateUserNameProps) => {
      setLoading(true)
      setUsername(name)

      await AsyncStorage.setItem('@app-cars/username', JSON.stringify(name))
      setLoading(false)
    },
    [setUsername],
  )

  const signOut = useCallback(async () => {
    await AsyncStorage.removeItem('@app-cars/username')
    setUsername(undefined)
  }, [])

  return (
    <AuthenticationContext.Provider
      value={{
        username,
        loading,
        signInLoading,
        signIn,
        updateUserName,
        signOut,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  )
}

function useAuthentication(): AuthenticationContextData {
  const context = useContext(AuthenticationContext)

  if (!context)
    throw new Error(
      'useAuthentication must be used within an AuthenticationProvder ',
    )
  return context
}

export { useAuthentication, AuthenticationProvider }
