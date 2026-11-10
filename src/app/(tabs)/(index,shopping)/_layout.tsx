import { Stack } from 'expo-router';

import type { TabStackLayoutProps } from '@/types/components';

const SCREEN_TITLES: Record<string, string> = {
  index: 'Cardápio da semana',
  shopping: 'Lista de compras',
};

export default function TabStackLayout({ segment }: TabStackLayoutProps) {
  const screenName = segment.match(/\((.*)\)/)?.[1] ?? 'index';

  return (
    <Stack screenOptions={{ headerLargeTitleEnabled: true, headerTransparent: process.env.EXPO_OS === 'ios', headerBlurEffect: 'systemChromeMaterial' }}>
      <Stack.Screen name={screenName} options={{ title: SCREEN_TITLES[screenName] }} />
    </Stack>
  );
}
