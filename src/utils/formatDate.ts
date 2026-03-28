export function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}.${m}.${d}`;
}

export function slugifyTag(tag: string): string {
  return tag.toLowerCase().replace(/\s+/g, '-');
}

export function truncateTitle(text: string, max = 60): string {
  if (text.length <= max) return text;
  const truncated = text.slice(0, max).replace(/\s+\S*$/, '');
  return `${truncated}...`;
}
