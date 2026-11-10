import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { Pressable, Text, View } from 'react-native';

import { colors } from '@/constants/colors';
import { MEAL_SLOT_LABELS, WEEK_DAY_LABELS } from '@/constants/mealLabels';
import type { MealSlotRowProps } from '@/types/components';

export default function MealSlotRow({ dayPlan, slot, onRemoveRecipe }: MealSlotRowProps) {
  const plannedRecipe = dayPlan[slot];
  const slotLabel = MEAL_SLOT_LABELS[slot];
  const dayLabel = WEEK_DAY_LABELS[dayPlan.day];

  return (
    <View style={{ gap: 8 }}>
      <Text style={{ fontSize: 13, fontWeight: '600', color: colors.secondaryLabel, textTransform: 'uppercase' }}>
        {slotLabel}
      </Text>
      {plannedRecipe ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Image
            source={{ uri: plannedRecipe.image }}
            contentFit="cover"
            transition={150}
            style={{
              width: 56,
              height: 56,
              borderRadius: 10,
              borderCurve: 'continuous',
              backgroundColor: colors.imagePlaceholder,
            }}
          />
          <View style={{ flex: 1, gap: 2 }}>
            <Text numberOfLines={2} style={{ fontSize: 16, fontWeight: '600', color: colors.label }}>
              {plannedRecipe.title}
            </Text>
            <Text style={{ fontSize: 13, color: colors.secondaryLabel, fontVariant: ['tabular-nums'] }}>
              {plannedRecipe.prepTime} min
            </Text>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Remover ${slotLabel.toLowerCase()} de ${dayLabel}`}
            hitSlop={8}
            onPress={() => onRemoveRecipe(dayPlan.day, slot)}
            style={({ pressed }) => ({
              width: 44,
              height: 44,
              alignItems: 'center',
              justifyContent: 'center',
              opacity: pressed ? 0.5 : 1,
            })}>
            <SymbolView
              name={{ ios: 'trash', android: 'delete', web: 'delete' }}
              size={20}
              tintColor={colors.destructive}
            />
          </Pressable>
        </View>
      ) : (
        <Link href={{ pathname: '/recipe-picker', params: { day: dayPlan.day, slot } }} asChild>
          <Pressable
            role="button"
            accessibilityLabel={`Adicionar ${slotLabel.toLowerCase()} de ${dayLabel}`}
            style={({ pressed }) => ({
              minHeight: 56,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              borderRadius: 10,
              borderCurve: 'continuous',
              borderWidth: 1,
              borderStyle: 'dashed',
              borderColor: colors.separator,
              opacity: pressed ? 0.5 : 1,
            })}>
            <SymbolView name={{ ios: 'plus', android: 'add', web: 'add' }} size={16} tintColor={colors.tint} />
            <Text style={{ fontSize: 15, fontWeight: '600', color: colors.tint }}>Adicionar receita</Text>
          </Pressable>
        </Link>
      )}
    </View>
  );
}
