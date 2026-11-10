import { SymbolView } from 'expo-symbols';
import { Pressable, Text, View } from 'react-native';
import Animated, { cubicBezier } from 'react-native-reanimated';

import useShoppingItemRow from '@/hooks/useShoppingItemRow';
import useThemeColors from '@/hooks/useThemeColors';
import type { ShoppingItemRowProps } from '@/types/components';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const CSS_EASE_OUT = cubicBezier(0.23, 1, 0.32, 1);

export default function ShoppingItemRow({ shoppingItem, checked, onToggle }: ShoppingItemRowProps) {
  const themeColors = useThemeColors();
  const { quantityLabel, accessibilityLabel, toggleThisItem } = useShoppingItemRow({ shoppingItem, onToggle });

  return (
    <AnimatedPressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      accessibilityLabel={accessibilityLabel}
      onPress={toggleThisItem}
      style={{
        minHeight: 52,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: themeColors.cardBackground,
        opacity: checked ? 0.4 : 1,
        transitionProperty: 'opacity',
        transitionDuration: 150,
        transitionTimingFunction: CSS_EASE_OUT,
      }}>
      <SymbolView
        name={
          checked
            ? { ios: 'checkmark.circle.fill', android: 'check_circle', web: 'check_circle' }
            : { ios: 'circle', android: 'radio_button_unchecked', web: 'radio_button_unchecked' }
        }
        size={24}
        tintColor={checked ? themeColors.success : themeColors.secondaryLabel}
      />
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 17,
            color: themeColors.label,
            textDecorationLine: checked ? 'line-through' : 'none',
          }}>
          {shoppingItem.name}
        </Text>
      </View>
      <Text selectable style={{ fontSize: 15, color: themeColors.secondaryLabel, fontVariant: ['tabular-nums'] }}>
        {quantityLabel}
      </Text>
    </AnimatedPressable>
  );
}
