import { describe, it, expect } from 'vitest';
import { formatDate } from './index';

describe('formatDate', () => {
  it('should format a date string correctly', () => {
    const formatted = formatDate('2024-04-21');
    expect(formatted).toContain('2024');
    expect(formatted).toContain('April');
  });
});
