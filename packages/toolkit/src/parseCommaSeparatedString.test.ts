import { describe, it, expect } from 'vitest';
import { parseCommaSeparatedString } from './parseCommaSeparatedString.js';

describe('parseCommaSeparatedString', () => {
  it('should parse, trim, and lowercase a comma-separated string', () => {
    const input = ' Pikachu, CHARIZARD , , bulbasaur ';
    const expected = ['pikachu', 'charizard', 'bulbasaur'];
    expect(parseCommaSeparatedString(input)).toEqual(expected);
  });

  it('should return an empty array for empty input', () => {
    expect(parseCommaSeparatedString('')).toEqual([]);
    expect(parseCommaSeparatedString('  ,  ')).toEqual([]);
  });
});
