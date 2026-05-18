/**
 * Parses a comma-separated string into a cleaned array of lowercase strings.
 * Removes empty values and trims whitespace.
 */
export function parseCommaSeparatedString(input: string): string[] {
  return input
    .split(',')
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
}
