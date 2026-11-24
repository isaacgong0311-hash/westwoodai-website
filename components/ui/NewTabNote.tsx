/**
 * Goes inside every link that opens a new tab, so screen-reader users hear
 * that before they activate it (WCAG 3.2.5, technique G201).
 */
export default function NewTabNote() {
  return <span className="sr-only"> (opens in a new tab)</span>;
}
