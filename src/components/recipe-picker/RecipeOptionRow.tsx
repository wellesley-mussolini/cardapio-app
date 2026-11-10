import { Image } from 'expo-image';
import { Pressable, Text, View } from 'react-native';

import { colors } from '@/constants/colors';
import type { RecipeOptionRowProps } from '@/types/components';

export default function RecipeOptionRow({ recipe, onChoose }: RecipeOptionRowProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${recipe.title}, ${recipe.prepTime} min`}
      onPress={() => onChoose(recipe)}
      style={({ pressed }) => ({
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        padding: 12,
        borderRadius: 14,
        borderCurve: 'continuous',
        backgroundColor: pressed ? colors.imagePlaceholder : colors.cardBackground,
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
          backgroundColor: colors.imagePlaceholder,
        }}
      />
      <View style={{ flex: 1, gap: 2 }}>
        <Text numberOfLines={2} style={{ fontSize: 17, fontWeight: '600', color: colors.label }}>
          {recipe.title}
        </Text>
        <Text style={{ fontSize: 13, color: colors.secondaryLabel, fontVariant: ['tabular-nums'] }}>
          {recipe.prepTime} min · {recipe.ingredients.length} ingredientes
        </Text>
      </View>
    </Pressable>
  );
}
