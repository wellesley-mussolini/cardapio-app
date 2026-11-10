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

function createPurchaseMark(shoppingItem: ShoppingItem) {
  return `${shoppingItem.key}@${shoppingItem.totalAmount}`;
}

function playPurchaseHaptic() {
  if (process.env.EXPO_OS === 'web') {
    return;
  }
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => undefined);
}

export default function useShoppingList(shoppingItems: ShoppingItem[]) {
  const [purchaseMarks, setPurchaseMarks] = useState<ReadonlySet<string>>(() => new Set());

  const shoppingItemsByKey = useMemo(
    () => new Map(shoppingItems.map((shoppingItem) => [shoppingItem.key, shoppingItem])),
    [shoppingItems],
  );

  const sections = useMemo<ShoppingSection[]>(
    () =>
      AISLES_IN_STORE_ORDER.map((category) => ({
        category,
        title: AISLE_TITLES[category],
        data: shoppingItems.filter((shoppingItem) => shoppingItem.category === category),
      })).filter((section) => section.data.length > 0),
    [shoppingItems],
  );

  const toggleItem = useCallback(
    (itemKey: string) => {
      const shoppingItem = shoppingItemsByKey.get(itemKey);
      if (!shoppingItem) {
        return;
      }
      playPurchaseHaptic();
      const purchaseMark = createPurchaseMark(shoppingItem);
      setPurchaseMarks((currentPurchaseMarks) => {
        const updatedPurchaseMarks = new Set(currentPurchaseMarks);
        if (updatedPurchaseMarks.has(purchaseMark)) {
          updatedPurchaseMarks.delete(purchaseMark);
        } else {
          updatedPurchaseMarks.add(purchaseMark);
        }
        return updatedPurchaseMarks;
      });
    },
    [shoppingItemsByKey],
  );

  const isChecked = useCallback(
    (itemKey: string) => {
      const shoppingItem = shoppingItemsByKey.get(itemKey);
      return shoppingItem ? purchaseMarks.has(createPurchaseMark(shoppingItem)) : false;
    },
    [shoppingItemsByKey, purchaseMarks],
  );

  const purchasedCount = useMemo(
    () => shoppingItems.filter((shoppingItem) => purchaseMarks.has(createPurchaseMark(shoppingItem))).length,
    [shoppingItems, purchaseMarks],
  );

  return { sections, isChecked, toggleItem, purchasedCount, totalCount: shoppingItems.length };
}
