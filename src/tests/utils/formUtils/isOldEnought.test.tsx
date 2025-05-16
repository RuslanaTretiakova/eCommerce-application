import { describe, it, expect } from 'vitest';
import { isOldEnough } from '../../../utils/formUtils/formatting';

describe('isOldEnough', () => {
  it('returns true for age 13 or older', () => {
    const thirteenYearsAgo = new Date();
    thirteenYearsAgo.setFullYear(thirteenYearsAgo.getFullYear() - 13);
    thirteenYearsAgo.setDate(thirteenYearsAgo.getDate() - 1);

    const result = isOldEnough(thirteenYearsAgo.toISOString().split('T')[0]);
    expect(result).toBe(true);
  });

  it('returns error message for under 13', () => {
    const twelveYearsAgo = new Date();
    twelveYearsAgo.setFullYear(twelveYearsAgo.getFullYear() - 12);

    const result = isOldEnough(twelveYearsAgo.toISOString().split('T')[0]);
    expect(result).toBe('You must be at least 13 years old');
  });
});
