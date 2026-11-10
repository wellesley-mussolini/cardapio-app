import { Color } from 'expo-router';
import { useMemo } from 'react';
import { useColorScheme } from 'react-native';

import type { ThemeColors } from '@/types/theme';

const WEB_LIGHT_COLORS: ThemeColors = {
  label: '#000000',
  secondaryLabel: '#3c3c43',
  groupedBackground: '#f2f2f7',
  cardBackground: '#ffffff',
  imagePlaceholder: '#e5e5ea',
  separator: '#c6c6c8',
  tint: '#007aff',
  destructive: '#ff3b30',
  success: '#34c759',
};

const WEB_DARK_COLORS: ThemeColors = {
  label: '#ffffff',
  secondaryLabel: '#ebebf599',
  groupedBackground: '#000000',
  cardBackground: '#1c1c1e',
  imagePlaceholder: '#2c2c2e',
  separator: '#38383a',
  tint: '#0a84ff',
  destructive: '#ff453a',
  success: '#30d158',
};

export function createThemeColors(
  platform: string | undefined,
  colorScheme: string | null | undefined,
): ThemeColors {
  if (platform === 'ios') {
    return {
      label: Color.ios.label,
      secondaryLabel: Color.ios.secondaryLabel,
      groupedBackground: Color.ios.systemGroupedBackground,
      cardBackground: Color.ios.secondarySystemGroupedBackground,
      imagePlaceholder: Color.ios.tertiarySystemFill,
      separator: Color.ios.separator,
      tint: Color.ios.systemBlue,
      destructive: Color.ios.systemRed,
      success: Color.ios.systemGreen,
    };
  }
  if (platform === 'android') {
    return {
      label: Color.android.dynamic.onSurface,
      secondaryLabel: Color.android.dynamic.onSurfaceVariant,
      groupedBackground: Color.android.dynamic.surface,
      cardBackground: Color.android.dynamic.surfaceContainer,
      imagePlaceholder: Color.android.dynamic.surfaceVariant,
      separator: Color.android.dynamic.outlineVariant,
      tint: Color.android.dynamic.primary,
      destructive: Color.android.dynamic.error,
      success: Color.android.dynamic.tertiary,
    };
  }
  return colorScheme === 'dark' ? WEB_DARK_COLORS : WEB_LIGHT_COLORS;
}

export default function useThemeColors(): ThemeColors {
  const colorScheme = useColorScheme();
  return useMemo(() => createThemeColors(process.env.EXPO_OS, colorScheme), [colorScheme]);
}
