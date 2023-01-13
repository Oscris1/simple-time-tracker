import { CompositeScreenProps } from '@react-navigation/native'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { StackScreenProps } from '@react-navigation/stack'

declare global {
  // PARAMS

  type RootStackParamList = {
    Tracker: undefined
  }

  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface RootParamList extends RootStackParamList {}
  }

  // Root stack
  type RootStackScreenProps = RootStackComposite
}

type RootStackComposite<S extends keyof RootStackParamList = keyof RootStackParamList> =
  CompositeScreenProps<
    StackScreenProps<RootStackParamList, S>,
    BottomTabScreenProps<MainTabParamList>
  >
