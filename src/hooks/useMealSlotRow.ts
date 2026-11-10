import { useCallback } from 'react';

import { MEAL_SLOT_LABELS, WEEK_DAY_LABELS } from '@/constants/mealSchedule';
import type { MealSlotRowProps } from '@/types/components';

export default function useMealSlotRow({ dayPlan, slot, onRemoveRecipe }: MealSlotRowProps) {
  const slotLabel = MEAL_SLOT_LABELS[slot];
  const dayLabel = WEEK_DAY_LABELS[dayPlan.day];

  const removePlannedRecipe = useCallback(
    () => onRemoveRecipe(dayPlan.day, slot),
    [onRemoveRecipe, dayPlan.day, slot],
  );

  return {
    plannedRecipe: dayPlan[slot],
    slotLabel,
    addRecipeLabel: `Adicionar ${slotLabel.toLowerCase()} de ${dayLabel}`,
    removeRecipeLabel: `Remover ${slotLabel.toLowerCase()} de ${dayLabel}`,
    recipePickerHref: { pathname: '/recipe-picker', params: { day: dayPlan.day, slot } } as const,
    removePlannedRecipe,
  };
}
