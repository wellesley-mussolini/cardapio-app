import { Stack } from 'expo-router';

import { LARGE_TITLE_STACK_OPTIONS } from '@/constants/largeTitleStackOptions';

export default function PlannerStackLayout() {
  return (
    <Stack screenOptions={LARGE_TITLE_STACK_OPTIONS}>
      <Stack.Screen name="index" options={{ title: 'Cardápio da semana' }} />
    </Stack>
  );
}
