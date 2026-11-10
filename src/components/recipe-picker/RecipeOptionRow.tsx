import { Image } from 'expo-image';
import { Pressable, Text, View } from 'react-native';

import useRecipeOptionRow from '@/hooks/useRecipeOptionRow';
import useThemeColors from '@/hooks/useThemeColors';
import type { RecipeOptionRowProps } from '@/types/components';

export default function RecipeOptionRow({ recipe, onChoose }: RecipeOptionRowProps) {
  const themeColors = useThemeColors();
  const { accessibilityLabel, recipeDetails, chooseThisRecipe } = useRecipeOptionRow({ recipe, onChoose });

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={chooseThisRecipe}
      style={({ pressed }) => ({
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        padding: 12,
        borderRadius: 14,
        borderCurve: 'continuous',
        backgroundColor: pressed ? themeColors.imagePlaceholder : themeColors.cardBackground,
      })}>
      <Image
        source={{ uri: recipe.image }}
        contentFit="cover"
        transition={150}
        style={{
          width: 64,
          height: 64,
          borderRadius: 10,
          borderCurve: 'continuous',
          backgroundColor: themeColors.imagePlaceholder,
        }}
      />
      <View style={{ flex: 1, gap: 2 }}>
        <Text numberOfLines={2} style={{ fontSize: 17, fontWeight: '600', color: themeColors.label }}>
          {recipe.title}
        </Text>
        <Text style={{ fontSize: 13, color: themeColors.secondaryLabel, fontVariant: ['tabular-nums'] }}>
          {recipeDetails}
        </Text>
      </View>
    </Pressable>
  );
}
