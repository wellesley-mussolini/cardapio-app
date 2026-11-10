import { router, useLocalSearchParams } from 'expo-router';
import { useCallback, useRef } from 'react';

import { MEAL_SLOT_LABELS, MEAL_SLOTS, WEEK_DAY_LABELS, WEEK_DAYS } from '@/constants/mealSchedule';
import useMealPlanner from '@/hooks/useMealPlanner';
import recipesMock from '@/mock/recipesMock';
import type { MealSlot, Recipe, RecipePickerParams, WeekDay } from '@/types/meal';

function isWeekDay(value: string | undefined): value is WeekDay {
  return WEEK_DAYS.includes(value as WeekDay);
}

function isMealSlot(value: string | undefined): value is MealSlot {
  return MEAL_SLOTS.includes(value as MealSlot);
}

export default function useRecipePicker() {
  const { day, slot } = useLocalSearchParams<RecipePickerParams>();
  const { addRecipe } = useMealPlanner();
  const recipeAlreadyChosenRef = useRef(false);
  const targetIsValid = isWeekDay(day) && isMealSlot(slot);

  const chooseRecipe = useCallback(
    (recipe: Recipe) => {
      if (recipeAlreadyChosenRef.current || !isWeekDay(day) || !isMealSlot(slot)) {
        return;
      }
      recipeAlreadyChosenRef.current = true;
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
