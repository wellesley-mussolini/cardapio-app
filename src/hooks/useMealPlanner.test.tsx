import { act, renderHook } from '@testing-library/react-native';

import useMealPlanner from '@/hooks/useMealPlanner';
import recipesMock from '@/mock/recipesMock';
import MealPlannerProvider from '@/providers/MealPlannerProvider';
import type { Recipe, ShoppingItem } from '@/types/meal';

const [chickenWithVegetables, pastaBolognese] = recipesMock;

async function renderMealPlanner() {
  return renderHook(() => useMealPlanner(), { wrapper: MealPlannerProvider });
}

function filterItemsByIngredient(
  aggregatedIngredients: ShoppingItem[],
  ingredientId: string,
) {
  return aggregatedIngredients.filter((shoppingItem) => shoppingItem.ingredientId === ingredientId);
}

describe('useMealPlanner', () => {
  it('starts with seven empty days from monday to sunday', async () => {
    const { result } = await renderMealPlanner();

    expect(result.current.weekPlan.map((dayPlan) => dayPlan.day)).toEqual([
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
      'sunday',
    ]);
    expect(
      result.current.weekPlan.every((dayPlan) => dayPlan.lunch === null && dayPlan.dinner === null),
    ).toBe(true);
    expect(result.current.aggregatedIngredients).toEqual([]);
  });

  it('places a recipe only in the chosen day and meal slot', async () => {
    const { result } = await renderMealPlanner();

    await act(() => result.current.addRecipe('wednesday', 'dinner', chickenWithVegetables));

    const wednesdayPlan = result.current.weekPlan.find((dayPlan) => dayPlan.day === 'wednesday');
    expect(wednesdayPlan?.dinner?.id).toBe(chickenWithVegetables.id);
    expect(wednesdayPlan?.lunch).toBeNull();
    const plannedMealCount = result.current.weekPlan.filter(
      (dayPlan) => dayPlan.lunch !== null || dayPlan.dinner !== null,
    ).length;
    expect(plannedMealCount).toBe(1);
  });

  it('removes the recipe from one slot and keeps the other slot of the same day', async () => {
    const { result } = await renderMealPlanner();

    await act(() => {
      result.current.addRecipe('monday', 'lunch', chickenWithVegetables);
      result.current.addRecipe('monday', 'dinner', pastaBolognese);
    });
    await act(() => result.current.removeRecipe('monday', 'lunch'));

    const mondayPlan = result.current.weekPlan.find((dayPlan) => dayPlan.day === 'monday');
    expect(mondayPlan?.lunch).toBeNull();
    expect(mondayPlan?.dinner?.id).toBe(pastaBolognese.id);
  });

  it('sums the amount of an ingredient shared by different planned recipes', async () => {
    const { result } = await renderMealPlanner();

    await act(() => {
      result.current.addRecipe('monday', 'lunch', chickenWithVegetables);
      result.current.addRecipe('tuesday', 'dinner', pastaBolognese);
    });

    const onionItems = filterItemsByIngredient(result.current.aggregatedIngredients, 'ing_cebola');
    expect(onionItems).toHaveLength(1);
    expect(onionItems[0]).toMatchObject({ name: 'Cebola', totalAmount: 3, unit: 'un', category: 'hortifruti' });
    const oliveOilItems = filterItemsByIngredient(result.current.aggregatedIngredients, 'ing_azeite');
    expect(oliveOilItems[0].totalAmount).toBe(50);
  });

  it('counts the ingredients again when the same recipe is planned twice', async () => {
    const { result } = await renderMealPlanner();

    await act(() => {
      result.current.addRecipe('monday', 'lunch', chickenWithVegetables);
      result.current.addRecipe('friday', 'dinner', chickenWithVegetables);
    });

    const chickenBreastItems = filterItemsByIngredient(result.current.aggregatedIngredients, 'ing_peito_frango');
    expect(chickenBreastItems[0].totalAmount).toBe(1000);
  });

  it('drops the ingredients of a removed recipe from the aggregation', async () => {
    const { result } = await renderMealPlanner();

    await act(() => {
      result.current.addRecipe('monday', 'lunch', chickenWithVegetables);
      result.current.addRecipe('tuesday', 'lunch', pastaBolognese);
    });
    await act(() => result.current.removeRecipe('tuesday', 'lunch'));

    expect(filterItemsByIngredient(result.current.aggregatedIngredients, 'ing_carne_moida')).toEqual([]);
    expect(filterItemsByIngredient(result.current.aggregatedIngredients, 'ing_cebola')[0].totalAmount).toBe(1);
  });

  it('keeps an ingredient listed in two different units as separate items', async () => {
    const { result } = await renderMealPlanner();
    const caramelizedOnionInGrams: Recipe = {
      id: 'rec_cebola_gramas',
      title: 'Cebola caramelizada',
      prepTime: 30,
      image: '',
      ingredients: [{ id: 'ing_cebola', name: 'Cebola', amount: 200, unit: 'g', category: 'hortifruti' }],
    };

    await act(() => {
      result.current.addRecipe('monday', 'lunch', chickenWithVegetables);
      result.current.addRecipe('monday', 'dinner', caramelizedOnionInGrams);
    });

    const onionItems = filterItemsByIngredient(result.current.aggregatedIngredients, 'ing_cebola');
    expect(onionItems.map((shoppingItem) => [shoppingItem.totalAmount, shoppingItem.unit])).toEqual([
      [1, 'un'],
      [200, 'g'],
    ]);
  });

  it('fails with a clear message when used outside MealPlannerProvider', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});

    await expect(renderHook(() => useMealPlanner())).rejects.toThrow(
      'useMealPlanner must be used inside MealPlannerProvider',
    );
  });
});
