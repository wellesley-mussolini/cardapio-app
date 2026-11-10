import { ScrollView, Text, View } from 'react-native';

import RecipeOptionRow from '@/components/recipe-picker/RecipeOptionRow';
import { colors } from '@/constants/colors';
import useRecipePicker from '@/hooks/useRecipePicker';

export default function RecipePickerScreen() {
  const { recipes, targetLabel, chooseRecipe } = useRecipePicker();

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ backgroundColor: colors.groupedBackground }}
      contentContainerStyle={{ padding: 16, paddingTop: 24, gap: 12 }}>
      <View style={{ gap: 4, paddingBottom: 4 }}>
        <Text accessibilityRole="header" style={{ fontSize: 22, fontWeight: '700', color: colors.label }}>
          {targetLabel ? 'Escolher receita' : 'Refeição inválida'}
        </Text>
        <Text style={{ fontSize: 15, color: colors.secondaryLabel }}>
          {targetLabel ?? 'Volte ao cardápio e toque em um horário livre.'}
        </Text>
      </View>
      {recipes.map((recipe) => (
        <RecipeOptionRow key={recipe.id} recipe={recipe} onChoose={chooseRecipe} />
      ))}
    </ScrollView>
  );
}
