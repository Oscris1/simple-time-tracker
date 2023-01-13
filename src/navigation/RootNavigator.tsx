import { createStackNavigator } from '@react-navigation/stack'
import { FC } from 'react'

import { useTranslation } from '~hooks'
import { ApplicationInfoScreen, TrackerScreen } from '~screens'

const { Navigator, Screen, Group } = createStackNavigator<RootStackParamList>()

export const RootNavigator: FC = () => {
  const { t } = useTranslation()

  return (
    <Navigator>
      <Group key="authorized">
        <Screen name="Tracker" options={{ title: 'Tracker' }} component={TrackerScreen} />
      </Group>

      <Group key="modals" screenOptions={{ presentation: 'modal' }}>
        <Screen
          name="ApplicationInfo"
          options={{ title: t('navigation.screen_titles.application_info') }}
          component={ApplicationInfoScreen}
        />
      </Group>
    </Navigator>
  )
}
