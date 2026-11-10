import { Stack } from 'expo-router';

import { LARGE_TITLE_STACK_OPTIONS } from '@/constants/largeTitleStackOptions';

export default function ShoppingStackLayout() {
  return (
    <Stack screenOptions={LARGE_TITLE_STACK_OPTIONS}>
      <Stack.Screen name="shopping" options={{ title: 'Lista de compras' }} />
    </Stack>
  );
}
