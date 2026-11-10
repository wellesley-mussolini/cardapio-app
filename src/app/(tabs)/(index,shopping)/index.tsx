import { ScrollView } from 'react-native';

import DayCard from '@/components/meal-planner/DayCard';
import { colors } from '@/constants/colors';
import useMealPlanner from '@/hooks/useMealPlanner';

export default function PlannerScreen() {
  const { weekPlan, removeRecipe } = useMealPlanner();

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ backgroundColor: colors.groupedBackground }}
      contentContainerStyle={{ padding: 16, gap: 16 }}>
      {weekPlan.map((dayPlan) => (
        <DayCard key={dayPlan.day} dayPlan={dayPlan} onRemoveRecipe={removeRecipe} />
      ))}
    </ScrollView>
  );
}
