import { useCallback } from 'react';

import type { ShoppingItemRowProps } from '@/types/components';
import formatQuantity from '@/utils/formatQuantity';

export default function useShoppingItemRow({ shoppingItem, onToggle }: Omit<ShoppingItemRowProps, 'checked'>) {
  const quantityLabel = formatQuantity(shoppingItem.totalAmount, shoppingItem.unit);

  const toggleThisItem = useCallback(() => onToggle(shoppingItem.key), [onToggle, shoppingItem.key]);

  return {
    quantityLabel,
    accessibilityLabel: `${shoppingItem.name}, ${quantityLabel}`,
    toggleThisItem,
  };
}
