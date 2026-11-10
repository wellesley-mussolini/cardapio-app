import formatQuantity from '@/utils/formatQuantity';

describe('formatQuantity', () => {
  it('writes whole amounts without decimals', () => {
    expect(formatQuantity(50, 'ml')).toBe('50 ml');
  });

  it('uses the Brazilian decimal comma for fractional amounts', () => {
    expect(formatQuantity(1.5, 'un')).toBe('1,5 un');
  });

  it('rounds long fractions to two decimal places', () => {
    expect(formatQuantity(1 / 3, 'kg')).toBe('0,33 kg');
  });
});
