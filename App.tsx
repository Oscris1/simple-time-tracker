// duplicated import of gesture handler is required for bottom sheet modal to work on android
/* eslint-disable import/no-duplicates */
// FIXME: see how why did you render works
// import './wdyr'
import 'react-native-gesture-handler'
import 'react-native-reanimated'
import '~i18n'

import { Navigation } from '~navigation'
import { Providers } from '~providers'

const isUsingReactotron = true
if (__DEV__ && isUsingReactotron && !process.env.JEST_WORKER_ID) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
}

const App = (): JSX.Element => {
  return (
    <Providers>
      <Navigation />
    </Providers>
  )
}

export default App
