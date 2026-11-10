import { act, renderHook } from '@testing-library/react-native';
import * as Haptics from 'expo-haptics';

import useShoppingList from '@/hooks/useShoppingList';
import type { ShoppingItem } from '@/types/meal';

jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(() => Promise.resolve()),
  ImpactFeedbackStyle: { Light: 'light', Medium: 'medium', Heavy: 'heavy' },
}));

const shoppingItems: ShoppingItem[] = [
  { key: 'ing_pao_forma:fatias', ingredientId: 'ing_pao_forma', name: 'Pão de forma', totalAmount: 4, unit: 'fatias', category: 'padaria' },
  { key: 'ing_cebola:un', ingredientId: 'ing_cebola', name: 'Cebola', totalAmount: 3, unit: 'un', category: 'hortifruti' },
  { key: 'ing_carne_moida:g', ingredientId: 'ing_carne_moida', name: 'Carne moída', totalAmount: 400, unit: 'g', category: 'acougue' },
  { key: 'ing_tomate:un', ingredientId: 'ing_tomate', name: 'Tomate', totalAmount: 5, unit: 'un', category: 'hortifruti' },
];

describe('useShoppingList', () => {
  beforeEach(() => {
    jest.mocked(Haptics.impactAsync).mockClear();
  });

  it('groups items by supermarket aisle in store-walk order and skips empty aisles', async () => {
    const { result } = await renderHook(() => useShoppingList(shoppingItems));

    expect(
      result.current.sections.map((section) => [
        section.title,
        section.data.map((shoppingItem) => shoppingItem.name),
      ]),
    ).toEqual([
      ['Hortifrúti', ['Cebola', 'Tomate']],
      ['Açougue', ['Carne moída']],
      ['Padaria', ['Pão de forma']],
    ]);
  });

  it('marks an item as purchased and unmarks it on the second toggle', async () => {
    const { result } = await renderHook(() => useShoppingList(shoppingItems));

    await act(() => result.current.toggleItem('ing_cebola:un'));
    expect(result.current.isChecked('ing_cebola:un')).toBe(true);
    expect(result.current.isChecked('ing_tomate:un')).toBe(false);

    await act(() => result.current.toggleItem('ing_cebola:un'));
    expect(result.current.isChecked('ing_cebola:un')).toBe(false);
  });

  it('fires one light haptic impact per toggle', async () => {
    const { result } = await renderHook(() => useShoppingList(shoppingItems));

    await act(() => result.current.toggleItem('ing_tomate:un'));

    expect(Haptics.impactAsync).toHaveBeenCalledTimes(1);
    expect(Haptics.impactAsync).toHaveBeenCalledWith(Haptics.ImpactFeedbackStyle.Light);
  });

  it('counts only purchased items that are still on the list', async () => {
    const { result, rerender } = await renderHook(
      ({ currentItems }: { currentItems: ShoppingItem[] }) => useShoppingList(currentItems),
      { initialProps: { currentItems: shoppingItems } },
    );

    await act(() => {
      result.current.toggleItem('ing_cebola:un');
      result.current.toggleItem('ing_tomate:un');
    });
    await rerender({ currentItems: shoppingItems.filter((shoppingItem) => shoppingItem.key !== 'ing_tomate:un') });

    expect(result.current.purchasedCount).toBe(1);
    expect(result.current.totalCount).toBe(3);
  });
});
