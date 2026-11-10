import { SymbolView } from 'expo-symbols';
import { Pressable, Text, View } from 'react-native';
import Animated, { cubicBezier } from 'react-native-reanimated';

import { colors } from '@/constants/colors';
import type { ShoppingItemRowProps } from '@/types/components';
import formatQuantity from '@/utils/formatQuantity';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const CSS_EASE_OUT = cubicBezier(0.23, 1, 0.32, 1);

export default function ShoppingItemRow({ shoppingItem, checked, onToggle }: ShoppingItemRowProps) {
  const quantityLabel = formatQuantity(shoppingItem.totalAmount, shoppingItem.unit);

  return (
    <AnimatedPressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      accessibilityLabel={`${shoppingItem.name}, ${quantityLabel}`}
      onPress={() => onToggle(shoppingItem.key)}
      style={{
        minHeight: 52,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: colors.cardBackground,
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
        tintColor={checked ? colors.success : colors.secondaryLabel}
      />
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 17,
            color: colors.label,
            textDecorationLine: checked ? 'line-through' : 'none',
          }}>
          {shoppingItem.name}
        </Text>
      </View>
      <Text selectable style={{ fontSize: 15, color: colors.secondaryLabel, fontVariant: ['tabular-nums'] }}>
        {quantityLabel}
      </Text>
    </AnimatedPressable>
  );
}
