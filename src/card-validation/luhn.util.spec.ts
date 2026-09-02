import { isValidLuhn } from './luhn.util';

describe('isValidLuhn', () => {
  it('returns true for a known valid card number', () => {
    expect(isValidLuhn('4532015112830366')).toBe(true);
  });

  it('returns true for another known valid test number', () => {
    expect(isValidLuhn('79927398713')).toBe(true);
  });

  it('returns false for a known invalid card number', () => {
    expect(isValidLuhn('1234567812345678')).toBe(false);
  });

  it('returns false when a single digit is altered from a valid number', () => {
    expect(isValidLuhn('4532015112830367')).toBe(false);
  });
});
