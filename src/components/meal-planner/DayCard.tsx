import { Fragment } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import MealSlotRow from '@/components/meal-planner/MealSlotRow';
import { MEAL_SLOTS, WEEK_DAY_LABELS } from '@/constants/mealSchedule';
import useThemeColors from '@/hooks/useThemeColors';
import type { DayCardProps } from '@/types/components';

export default function DayCard({ dayPlan, onRemoveRecipe }: DayCardProps) {
  const themeColors = useThemeColors();

  return (
    <View
      style={{
        gap: 12,
        padding: 16,
        borderRadius: 16,
        borderCurve: 'continuous',
        backgroundColor: themeColors.cardBackground,
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
      }}>
      <Text accessibilityRole="header" style={{ fontSize: 20, fontWeight: '700', color: themeColors.label }}>
        {WEEK_DAY_LABELS[dayPlan.day]}
      </Text>
      {MEAL_SLOTS.map((slot, slotPosition) => (
        <Fragment key={slot}>
          {slotPosition > 0 && (
            <View style={{ height: StyleSheet.hairlineWidth, backgroundColor: themeColors.separator }} />
          )}
          <MealSlotRow dayPlan={dayPlan} slot={slot} onRemoveRecipe={onRemoveRecipe} />
        </Fragment>
      ))}
    </View>
  );
}
