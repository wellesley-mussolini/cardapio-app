import { SectionList } from 'react-native';

import EmptyShoppingList from '@/components/shopping/EmptyShoppingList';
import ShoppingProgress from '@/components/shopping/ShoppingProgress';
import useShoppingScreen from '@/hooks/useShoppingScreen';
import useThemeColors from '@/hooks/useThemeColors';

export default function ShoppingScreen() {
  const themeColors = useThemeColors();
  const { sections, purchasedCount, totalCount, extractItemKey, renderSectionHeader, renderShoppingItem } =
    useShoppingScreen();

  return (
    <SectionList
      contentInsetAdjustmentBehavior="automatic"
      style={{ backgroundColor: themeColors.groupedBackground }}
      contentContainerStyle={{ paddingBottom: 32 }}
      sections={sections}
      keyExtractor={extractItemKey}
      stickySectionHeadersEnabled={false}
      ListHeaderComponent={
        totalCount > 0 ? <ShoppingProgress purchasedCount={purchasedCount} totalCount={totalCount} /> : undefined
      }
      ListEmptyComponent={<EmptyShoppingList />}
      renderSectionHeader={renderSectionHeader}
      renderItem={renderShoppingItem}
    />
  );
}
