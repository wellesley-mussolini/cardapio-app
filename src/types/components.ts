import type { ReactNode } from 'react';

import type { DayMealPlan, MealSlot, Recipe, ShoppingItem, WeekDay } from '@/types/meal';

export type MealPlannerProviderProps = {
  children: ReactNode;
};

export type DayCardProps = {
  dayPlan: DayMealPlan;
  onRemoveRecipe: (day: WeekDay, slot: MealSlot) => void;
};

export type MealSlotRowProps = {
  dayPlan: DayMealPlan;
  slot: MealSlot;
  onRemoveRecipe: (day: WeekDay, slot: MealSlot) => void;
};

export type ShoppingItemRowProps = {
  shoppingItem: ShoppingItem;
  checked: boolean;
  onToggle: (itemKey: string) => void;
};

export type ShoppingSectionHeaderProps = {
  title: string;
};

export type ShoppingProgressProps = {
  purchasedCount: number;
  totalCount: number;
};

export type RecipeOptionRowProps = {
  recipe: Recipe;
  onChoose: (recipe: Recipe) => void;
};
