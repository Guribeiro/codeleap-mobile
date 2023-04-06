// import { useEffect } from 'react'

import FullScreenLoading from '@shared/common/components/FullScreenLoading'
import { NavigationContainer } from '@react-navigation/native'

import SplashRoutes from './splash.routes'

const Routes = (): JSX.Element => {
  const loading = false
  // useEffect(() => {
  //   loadStorageAuthentication()
  // }, [loadStorageAuthentication])

  if (loading) return <FullScreenLoading />

  return (
    <NavigationContainer>
      <SplashRoutes />
    </NavigationContainer>
  )
}

export default Routes
