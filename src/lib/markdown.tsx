import { Fragment, type ReactNode } from "react";
import Link from "next/link";

/** Render inline **bold**, *italic* and [link text](/internal/path or https://…) markers. */
function renderInline(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const regex = /(\[[^\]]+\]\([^)\s]+\)|\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let i = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    const token = match[0];
    if (token.startsWith("[")) {
      const m = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(token)!;
      const [, label, href] = m;
      parts.push(
        href.startsWith("/") ? (
          <Link key={i++} href={href} className="font-medium text-primary underline underline-offset-2 hover:text-leaf">
            {label}
          </Link>
        ) : (
          <a key={i++} href={href} target="_blank" rel="noopener" className="font-medium text-primary underline underline-offset-2 hover:text-leaf">
            {label}
          </a>
        )
      );
    } else if (token.startsWith("**")) {
      parts.push(
        <strong key={i++} className="font-semibold text-foreground">
          {token.slice(2, -2)}
        </strong>
      );
    } else {
      parts.push(<em key={i++}>{token.slice(1, -1)}</em>);
    }
    last = match.index + token.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

export function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\p{M}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
}

type Block =
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] };

export function parseBlocks(body: string): Block[] {
  const blocks: Block[] = [];
  const chunks = body.trim().split(/\n\s*\n/);
  for (const chunk of chunks) {
    const lines = chunk.split("\n").map((l) => l.trim()).filter(Boolean);
    if (lines.length === 0) continue;
    if (lines[0].startsWith("## ")) {
      blocks.push({ type: "h2", text: lines[0].slice(3) });
      const rest = lines.slice(1);
      if (rest.length) blocks.push({ type: "p", text: rest.join(" ") });
    } else if (lines.every((l) => l.startsWith("- "))) {
      blocks.push({ type: "ul", items: lines.map((l) => l.slice(2)) });
    } else {
      blocks.push({ type: "p", text: lines.join(" ") });
    }
  }
  return blocks;
}

export function extractHeadings(body: string) {
  return parseBlocks(body)
    .filter((b): b is { type: "h2"; text: string } => b.type === "h2")
    .map((b) => ({ id: slugifyHeading(b.text), text: b.text }));
}

export function Markdown({ body }: { body: string }) {
  const blocks = parseBlocks(body);
  return (
    <div className="prose-ayur">
      {blocks.map((block, idx) => (
        <Fragment key={idx}>
          {block.type === "h2" && <h2 id={slugifyHeading(block.text)}>{block.text}</h2>}
          {block.type === "p" && <p>{renderInline(block.text)}</p>}
          {block.type === "ul" && (
            <ul>
              {block.items.map((item, j) => (
                <li key={j}>{renderInline(item)}</li>
              ))}
            </ul>
          )}
        </Fragment>
      ))}
    </div>
  );
}
