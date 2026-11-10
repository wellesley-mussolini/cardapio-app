import { StyleSheet, Text, View } from 'react-native';

import MealSlotRow from '@/components/meal-planner/MealSlotRow';
import { colors } from '@/constants/colors';
import { WEEK_DAY_LABELS } from '@/constants/mealLabels';
import type { DayCardProps } from '@/types/components';

export default function DayCard({ dayPlan, onRemoveRecipe }: DayCardProps) {
  return (
    <View
      style={{
        gap: 12,
        padding: 16,
        borderRadius: 16,
        borderCurve: 'continuous',
        backgroundColor: colors.cardBackground,
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
      }}>
      <Text accessibilityRole="header" style={{ fontSize: 20, fontWeight: '700', color: colors.label }}>
        {WEEK_DAY_LABELS[dayPlan.day]}
      </Text>
      <MealSlotRow dayPlan={dayPlan} slot="lunch" onRemoveRecipe={onRemoveRecipe} />
      <View style={{ height: StyleSheet.hairlineWidth, backgroundColor: colors.separator }} />
      <MealSlotRow dayPlan={dayPlan} slot="dinner" onRemoveRecipe={onRemoveRecipe} />
    </View>
  );
}
