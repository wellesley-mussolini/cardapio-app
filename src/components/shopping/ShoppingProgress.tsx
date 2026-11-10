import { Text } from 'react-native';

import useThemeColors from '@/hooks/useThemeColors';
import type { ShoppingProgressProps } from '@/types/components';

export default function ShoppingProgress({ purchasedCount, totalCount }: ShoppingProgressProps) {
  const themeColors = useThemeColors();

  return (
    <Text
      style={{
        paddingHorizontal: 16,
        paddingTop: 8,
        fontSize: 15,
        color: themeColors.secondaryLabel,
        fontVariant: ['tabular-nums'],
      }}>
      {`${purchasedCount} de ${totalCount} comprados`}
    </Text>
  );
}
