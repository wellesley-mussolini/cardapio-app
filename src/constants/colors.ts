import { Color } from 'expo-router';
import { Platform } from 'react-native';

export const colors = {
  label: Platform.select({
    ios: Color.ios.label,
    android: Color.android.dynamic.onSurface,
    default: '#000000',
  })!,
  secondaryLabel: Platform.select({
    ios: Color.ios.secondaryLabel,
    android: Color.android.dynamic.onSurfaceVariant,
    default: '#3c3c43',
  })!,
  groupedBackground: Platform.select({
    ios: Color.ios.systemGroupedBackground,
    android: Color.android.dynamic.surface,
    default: '#f2f2f7',
  })!,
  cardBackground: Platform.select({
    ios: Color.ios.secondarySystemGroupedBackground,
    android: Color.android.dynamic.surfaceContainer,
    default: '#ffffff',
  })!,
  imagePlaceholder: Platform.select({
    ios: Color.ios.tertiarySystemFill,
    android: Color.android.dynamic.surfaceVariant,
    default: '#e5e5ea',
  })!,
  separator: Platform.select({
    ios: Color.ios.separator,
    android: Color.android.dynamic.outlineVariant,
    default: '#c6c6c8',
  })!,
  tint: Platform.select({
    ios: Color.ios.systemBlue,
    android: Color.android.dynamic.primary,
    default: '#007aff',
  })!,
  destructive: Platform.select({
    ios: Color.ios.systemRed,
    android: Color.android.dynamic.error,
    default: '#ff3b30',
  })!,
  success: Platform.select({
    ios: Color.ios.systemGreen,
    android: Color.android.dynamic.tertiary,
    default: '#34c759',
  })!,
};
