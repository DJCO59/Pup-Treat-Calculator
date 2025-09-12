import DOMPurify from "dompurify";

export function SafeHtml({ html }: { html: string }) {
  const sanitized = DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });
  return <div dangerouslySetInnerHTML={{ __html: sanitized }} />;
}
