export function splitHighlight(text: string, highlight: string): [string, string, string] {
  const start = text.indexOf(highlight);
  if (start === -1) return [text, "", ""];
  const end = start + highlight.length;
  return [text.slice(0, start), highlight, text.slice(end)];
}
