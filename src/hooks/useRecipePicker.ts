import { router, useLocalSearchParams } from 'expo-router';
import { useCallback } from 'react';

import { MEAL_SLOT_LABELS, WEEK_DAY_LABELS } from '@/constants/mealLabels';
import useMealPlanner, { WEEK_DAYS } from '@/hooks/useMealPlanner';
import recipesMock from '@/mock/recipesMock';
import type { MealSlot, Recipe, RecipePickerParams, WeekDay } from '@/types/meal';

const MEAL_SLOTS: MealSlot[] = ['lunch', 'dinner'];

function isWeekDay(value: string | undefined): value is WeekDay {
  return WEEK_DAYS.includes(value as WeekDay);
}

function isMealSlot(value: string | undefined): value is MealSlot {
  return MEAL_SLOTS.includes(value as MealSlot);
}

export default function useRecipePicker() {
  const { day, slot } = useLocalSearchParams<RecipePickerParams>();
  const { addRecipe } = useMealPlanner();
  const targetIsValid = isWeekDay(day) && isMealSlot(slot);

  const chooseRecipe = useCallback(
    (recipe: Recipe) => {
      if (!isWeekDay(day) || !isMealSlot(slot)) {
        return;
      }
      addRecipe(day, slot, recipe);
      router.back();
    },
    [addRecipe, day, slot],
  );

  return {
    recipes: targetIsValid ? recipesMock : [],
    targetLabel: targetIsValid ? `${MEAL_SLOT_LABELS[slot]} de ${WEEK_DAY_LABELS[day]}` : null,
    chooseRecipe,
  };
}
