import type { ReactNode } from 'react';

import { MealPlannerContext, useMealPlannerState } from '@/hooks/useMealPlanner';

export default function MealPlannerProvider({ children }: { children: ReactNode }) {
  const mealPlanner = useMealPlannerState();
  return <MealPlannerContext value={mealPlanner}>{children}</MealPlannerContext>;
}
