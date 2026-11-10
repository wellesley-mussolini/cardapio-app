import { MealPlannerContext, useMealPlannerState } from '@/hooks/useMealPlanner';
import type { MealPlannerProviderProps } from '@/types/components';

export default function MealPlannerProvider({ children }: MealPlannerProviderProps) {
  const mealPlanner = useMealPlannerState();
  return <MealPlannerContext value={mealPlanner}>{children}</MealPlannerContext>;
}
