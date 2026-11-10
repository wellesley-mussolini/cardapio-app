import { Text, View } from 'react-native';

import useThemeColors from '@/hooks/useThemeColors';

export default function EmptyShoppingList() {
  const themeColors = useThemeColors();

  return (
    <View style={{ alignItems: 'center', gap: 8, paddingHorizontal: 32, paddingTop: 96 }}>
      <Text style={{ fontSize: 20, fontWeight: '600', color: themeColors.label, textAlign: 'center' }}>
        Sua lista está vazia
      </Text>
      <Text style={{ fontSize: 15, color: themeColors.secondaryLabel, textAlign: 'center' }}>
        Adicione receitas ao cardápio da semana para montar a lista de compras.
      </Text>
    </View>
  );
}
