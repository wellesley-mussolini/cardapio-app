import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { Pressable, Text, View } from 'react-native';

import useMealSlotRow from '@/hooks/useMealSlotRow';
import useThemeColors from '@/hooks/useThemeColors';
import type { MealSlotRowProps } from '@/types/components';

export default function MealSlotRow(mealSlotRowProps: MealSlotRowProps) {
  const themeColors = useThemeColors();
  const { plannedRecipe, slotLabel, addRecipeLabel, removeRecipeLabel, recipePickerHref, removePlannedRecipe } =
    useMealSlotRow(mealSlotRowProps);

  return (
    <View style={{ gap: 8 }}>
      <Text style={{ fontSize: 13, fontWeight: '600', color: themeColors.secondaryLabel, textTransform: 'uppercase' }}>
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
              backgroundColor: themeColors.imagePlaceholder,
            }}
          />
          <View style={{ flex: 1, gap: 2 }}>
            <Text numberOfLines={2} style={{ fontSize: 16, fontWeight: '600', color: themeColors.label }}>
              {plannedRecipe.title}
            </Text>
            <Text style={{ fontSize: 13, color: themeColors.secondaryLabel, fontVariant: ['tabular-nums'] }}>
              {plannedRecipe.prepTime} min
            </Text>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={removeRecipeLabel}
            hitSlop={8}
            onPress={removePlannedRecipe}
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
              tintColor={themeColors.destructive}
            />
          </Pressable>
        </View>
      ) : (
        <Link href={recipePickerHref} asChild>
          <Pressable
            role="button"
            accessibilityLabel={addRecipeLabel}
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
              borderColor: themeColors.separator,
              opacity: pressed ? 0.5 : 1,
            })}>
            <SymbolView name={{ ios: 'plus', android: 'add', web: 'add' }} size={16} tintColor={themeColors.tint} />
            <Text style={{ fontSize: 15, fontWeight: '600', color: themeColors.tint }}>Adicionar receita</Text>
          </Pressable>
        </Link>
      )}
    </View>
  );
}
