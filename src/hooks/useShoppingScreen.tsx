import { useCallback } from 'react';
import type { SectionListRenderItem } from 'react-native';

import ShoppingItemRow from '@/components/shopping/ShoppingItemRow';
import ShoppingSectionHeader from '@/components/shopping/ShoppingSectionHeader';
import useMealPlanner from '@/hooks/useMealPlanner';
import useShoppingList from '@/hooks/useShoppingList';
import type { ShoppingItem, ShoppingSection } from '@/types/meal';

export default function useShoppingScreen() {
  const { aggregatedIngredients } = useMealPlanner();
  const { sections, isChecked, toggleItem, purchasedCount, totalCount } = useShoppingList(aggregatedIngredients);

  const extractItemKey = useCallback((shoppingItem: ShoppingItem) => shoppingItem.key, []);

  const renderSectionHeader = useCallback(
    ({ section }: { section: ShoppingSection }) => <ShoppingSectionHeader title={section.title} />,
    [],
  );

  const renderShoppingItem = useCallback<SectionListRenderItem<ShoppingItem, ShoppingSection>>(
    ({ item: shoppingItem }) => (
      <ShoppingItemRow shoppingItem={shoppingItem} checked={isChecked(shoppingItem.key)} onToggle={toggleItem} />
    ),
    [isChecked, toggleItem],
  );

  return { sections, purchasedCount, totalCount, extractItemKey, renderSectionHeader, renderShoppingItem };
}
