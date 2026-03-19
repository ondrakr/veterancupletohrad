/** Odstraní &nbsp; z HTML/textu */
export function cleanNbsp(text: string): string {
  return text.replace(/&nbsp;/g, ' ');
}
