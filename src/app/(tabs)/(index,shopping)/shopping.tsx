import { SectionList, Text, View } from 'react-native';

import ShoppingItemRow from '@/components/shopping/ShoppingItemRow';
import { colors } from '@/constants/colors';
import useMealPlanner from '@/hooks/useMealPlanner';
import useShoppingList from '@/hooks/useShoppingList';

export default function ShoppingScreen() {
  const { aggregatedIngredients } = useMealPlanner();
  const { sections, isChecked, toggleItem, purchasedCount, totalCount } = useShoppingList(aggregatedIngredients);

  return (
    <SectionList
      contentInsetAdjustmentBehavior="automatic"
      style={{ backgroundColor: colors.groupedBackground }}
      contentContainerStyle={{ paddingBottom: 32 }}
      sections={sections}
      keyExtractor={(shoppingItem) => shoppingItem.key}
      stickySectionHeadersEnabled={false}
      ListHeaderComponent={
        totalCount > 0 ? (
          <Text
            style={{
              paddingHorizontal: 16,
              paddingTop: 8,
              fontSize: 15,
              color: colors.secondaryLabel,
              fontVariant: ['tabular-nums'],
            }}>
            {`${purchasedCount} de ${totalCount} comprados`}
          </Text>
        ) : undefined
      }
      ListEmptyComponent={
        <View style={{ alignItems: 'center', gap: 8, paddingHorizontal: 32, paddingTop: 96 }}>
          <Text style={{ fontSize: 20, fontWeight: '600', color: colors.label, textAlign: 'center' }}>
            Sua lista está vazia
          </Text>
          <Text style={{ fontSize: 15, color: colors.secondaryLabel, textAlign: 'center' }}>
            Adicione receitas ao cardápio da semana para montar a lista de compras.
          </Text>
        </View>
      }
      renderSectionHeader={({ section }) => (
        <Text
          accessibilityRole="header"
          style={{
            paddingHorizontal: 16,
            paddingTop: 24,
            paddingBottom: 8,
            fontSize: 13,
            fontWeight: '600',
            color: colors.secondaryLabel,
            textTransform: 'uppercase',
          }}>
          {section.title}
        </Text>
      )}
      renderItem={({ item: shoppingItem }) => (
        <ShoppingItemRow shoppingItem={shoppingItem} checked={isChecked(shoppingItem.key)} onToggle={toggleItem} />
      )}
    />
  );
}
