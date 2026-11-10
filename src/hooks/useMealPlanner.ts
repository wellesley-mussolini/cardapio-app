import { createContext, use, useCallback, useMemo, useState } from 'react';

import type { DayMealPlan, MealPlanner, MealSlot, Recipe, ShoppingItem, WeekDay } from '@/types/meal';

export const WEEK_DAYS: WeekDay[] = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

export const MealPlannerContext = createContext<MealPlanner | null>(null);

function createEmptyWeekPlan(): DayMealPlan[] {
  return WEEK_DAYS.map((day) => ({ day, lunch: null, dinner: null }));
}

function sumIngredientsByIdAndUnit(weekPlan: DayMealPlan[]): ShoppingItem[] {
  const plannedRecipes = weekPlan
    .flatMap((dayPlan) => [dayPlan.lunch, dayPlan.dinner])
    .filter((recipe): recipe is Recipe => recipe !== null);
  const shoppingItemsByKey = new Map<string, ShoppingItem>();

  for (const recipe of plannedRecipes) {
    for (const ingredient of recipe.ingredients) {
      const itemKey = `${ingredient.id}:${ingredient.unit}`;
      const itemAlreadyListed = shoppingItemsByKey.get(itemKey);
      shoppingItemsByKey.set(
        itemKey,
        itemAlreadyListed
          ? { ...itemAlreadyListed, totalAmount: itemAlreadyListed.totalAmount + ingredient.amount }
          : {
              key: itemKey,
              ingredientId: ingredient.id,
              name: ingredient.name,
              totalAmount: ingredient.amount,
              unit: ingredient.unit,
              category: ingredient.category,
            },
      );
    }
  }

  return [...shoppingItemsByKey.values()];
}

export function useMealPlannerState(): MealPlanner {
  const [weekPlan, setWeekPlan] = useState(createEmptyWeekPlan);

  const assignSlot = useCallback((day: WeekDay, slot: MealSlot, recipe: Recipe | null) => {
    setWeekPlan((currentWeekPlan) =>
      currentWeekPlan.map((dayPlan) => (dayPlan.day === day ? { ...dayPlan, [slot]: recipe } : dayPlan)),
    );
  }, []);

  const addRecipe = useCallback(
    (day: WeekDay, slot: MealSlot, recipe: Recipe) => assignSlot(day, slot, recipe),
    [assignSlot],
  );

  const removeRecipe = useCallback(
    (day: WeekDay, slot: MealSlot) => assignSlot(day, slot, null),
    [assignSlot],
  );

  const aggregatedIngredients = useMemo(() => sumIngredientsByIdAndUnit(weekPlan), [weekPlan]);

  return useMemo(
    () => ({ weekPlan, aggregatedIngredients, addRecipe, removeRecipe }),
    [weekPlan, aggregatedIngredients, addRecipe, removeRecipe],
  );
}

export default function useMealPlanner(): MealPlanner {
  const mealPlanner = use(MealPlannerContext);
  if (!mealPlanner) {
    throw new Error('useMealPlanner must be used inside MealPlannerProvider');
  }
  return mealPlanner;
}
