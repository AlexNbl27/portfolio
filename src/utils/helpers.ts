export const cx = (...parts: Array<string | false | undefined>) =>
  parts.filter(Boolean).join(' ');

export const byCategory = <T extends { category: string }>(
  items: T[],
  category: string
) => (category === 'all' ? items : items.filter((item) => item.category === category));
