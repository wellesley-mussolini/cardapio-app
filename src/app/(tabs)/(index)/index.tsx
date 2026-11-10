import { ScrollView } from 'react-native';

import DayCard from '@/components/meal-planner/DayCard';
import useMealPlanner from '@/hooks/useMealPlanner';
import useThemeColors from '@/hooks/useThemeColors';

export default function PlannerScreen() {
  const themeColors = useThemeColors();
  const { weekPlan, removeRecipe } = useMealPlanner();

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ backgroundColor: themeColors.groupedBackground }}
      contentContainerStyle={{ padding: 16, gap: 16 }}>
      {weekPlan.map((dayPlan) => (
        <DayCard key={dayPlan.day} dayPlan={dayPlan} onRemoveRecipe={removeRecipe} />
      ))}
    </ScrollView>
  );
}
