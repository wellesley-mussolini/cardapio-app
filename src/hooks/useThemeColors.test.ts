import { createThemeColors } from '@/hooks/useThemeColors';

describe('createThemeColors', () => {
  it('uses dark fallback colors on web when the system is in dark mode', () => {
    expect(createThemeColors('web', 'dark')).toMatchObject({
      label: '#ffffff',
      groupedBackground: '#000000',
      cardBackground: '#1c1c1e',
    });
  });

  it('uses light fallback colors on web when the system is in light mode', () => {
    expect(createThemeColors('web', 'light')).toMatchObject({
      label: '#000000',
      groupedBackground: '#f2f2f7',
      cardBackground: '#ffffff',
    });
  });
});
