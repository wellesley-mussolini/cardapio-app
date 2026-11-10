import * as Haptics from 'expo-haptics';
import { useCallback, useMemo, useState } from 'react';

import type { CategoryAisle, ShoppingItem, ShoppingSection } from '@/types/meal';

const AISLES_IN_STORE_ORDER: CategoryAisle[] = ['hortifruti', 'acougue', 'mercearia', 'padaria'];

const AISLE_TITLES: Record<CategoryAisle, string> = {
  hortifruti: 'Hortifrúti',
  acougue: 'Açougue',
  mercearia: 'Mercearia',
  padaria: 'Padaria',
};

export default function useShoppingList(shoppingItems: ShoppingItem[]) {
  const [checkedItemKeys, setCheckedItemKeys] = useState<string[]>([]);

  const sections = useMemo<ShoppingSection[]>(
    () =>
      AISLES_IN_STORE_ORDER.map((category) => ({
        category,
        title: AISLE_TITLES[category],
        data: shoppingItems.filter((shoppingItem) => shoppingItem.category === category),
      })).filter((section) => section.data.length > 0),
    [shoppingItems],
  );

  const toggleItem = useCallback((itemKey: string) => {
    if (process.env.EXPO_OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setCheckedItemKeys((currentCheckedKeys) =>
      currentCheckedKeys.includes(itemKey)
        ? currentCheckedKeys.filter((checkedKey) => checkedKey !== itemKey)
        : [...currentCheckedKeys, itemKey],
    );
  }, []);

  const isChecked = useCallback((itemKey: string) => checkedItemKeys.includes(itemKey), [checkedItemKeys]);

  const purchasedCount = shoppingItems.filter((shoppingItem) => checkedItemKeys.includes(shoppingItem.key)).length;

  return { sections, isChecked, toggleItem, purchasedCount, totalCount: shoppingItems.length };
}
