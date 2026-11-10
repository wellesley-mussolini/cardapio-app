import { Text } from 'react-native';

import useThemeColors from '@/hooks/useThemeColors';
import type { ShoppingSectionHeaderProps } from '@/types/components';

export default function ShoppingSectionHeader({ title }: ShoppingSectionHeaderProps) {
  const themeColors = useThemeColors();

  return (
    <Text
      accessibilityRole="header"
      style={{
        paddingHorizontal: 16,
        paddingTop: 24,
        paddingBottom: 8,
        fontSize: 13,
        fontWeight: '600',
        color: themeColors.secondaryLabel,
        textTransform: 'uppercase',
      }}>
      {title}
    </Text>
  );
}
