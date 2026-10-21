/**
 * Generates formatted SQL query string for terminal displays.
 */
export function buildSqlQuery(table: string, filterKey: string, filterValue: string): string {
  return `SELECT * FROM ${table} WHERE ${filterKey}='${filterValue}'`;
}

/**
 * Formats a terminal prompt line with username and machine name.
 */
export function formatTerminalPrompt(user = 'root', host = 'local', path = '~'): string {
  return `${user}@${host}:${path}#`;
}

/**
 * Truncate long text strings safely.
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}...`;
}

/**
 * Validates and normalizes external URLs.
 */
export function isExternalUrl(url: string): boolean {
  return url.startsWith('http://') || url.startsWith('https://');
}
