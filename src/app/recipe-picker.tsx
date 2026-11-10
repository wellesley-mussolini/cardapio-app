import { ScrollView, Text, View } from 'react-native';

import RecipeOptionRow from '@/components/recipe-picker/RecipeOptionRow';
import useRecipePicker from '@/hooks/useRecipePicker';
import useThemeColors from '@/hooks/useThemeColors';

export default function RecipePickerScreen() {
  const themeColors = useThemeColors();
  const { recipes, targetLabel, chooseRecipe } = useRecipePicker();

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ backgroundColor: themeColors.groupedBackground }}
      contentContainerStyle={{ padding: 16, paddingTop: 24, gap: 12 }}>
      <View style={{ gap: 4, paddingBottom: 4 }}>
        <Text accessibilityRole="header" style={{ fontSize: 22, fontWeight: '700', color: themeColors.label }}>
          {targetLabel ? 'Escolher receita' : 'Refeição inválida'}
        </Text>
        <Text style={{ fontSize: 15, color: themeColors.secondaryLabel }}>
          {targetLabel ?? 'Volte ao cardápio e toque em um horário livre.'}
        </Text>
      </View>
      {recipes.map((recipe) => (
        <RecipeOptionRow key={recipe.id} recipe={recipe} onChoose={chooseRecipe} />
      ))}
    </ScrollView>
  );
}
