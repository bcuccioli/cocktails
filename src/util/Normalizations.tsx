const normalizations: Record<string, string> = {
  'absolut.*': 'vodka',
  '\\w+ vodka': 'vodka',
  '\\w+ brandy': 'brandy',
  'bailey.*': 'bailey\'s',
  '\\w+ rum': 'rum',
};

export default function normalize(s: string) {
  for (const pattern in normalizations) {
    if (new RegExp(pattern, 'giu').test(s)) {
      return normalizations[pattern];
    }
  }

  return s;
}
