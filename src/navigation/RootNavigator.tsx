import { createStackNavigator } from '@react-navigation/stack'
import { FC } from 'react'

import { TrackerScreen } from '~screens'

const { Navigator, Screen, Group } = createStackNavigator<RootStackParamList>()

export const RootNavigator: FC = () => {
  return (
    <Navigator>
      <Group key="main">
        <Screen name="Tracker" options={{ title: 'Tracker' }} component={TrackerScreen} />
      </Group>
    </Navigator>
  )
}
