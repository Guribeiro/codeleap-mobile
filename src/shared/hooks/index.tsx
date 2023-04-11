import { ReactNode } from 'react'
import { ThemeProvider } from './theme'
import { LikeProvider } from './likes'

interface AppProviderProps {
  children: ReactNode
}

const AppProvider = ({ children }: AppProviderProps): JSX.Element => {
  return (
    <ThemeProvider>
      <LikeProvider>{children}</LikeProvider>
    </ThemeProvider>
  )
}

export default AppProvider
