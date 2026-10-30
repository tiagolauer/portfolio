export const TOKEN_KIND = {
  plain: "plain",
  keyword: "keyword",
  string: "string",
  hovered: "hovered",
} as const;

export const TOOLTIP_KIND = {
  plain: "plain",
  keyword: "keyword",
  name: "name",
  result: "result",
  primitive: "primitive",
  error: "error",
} as const;

type TokenKind = (typeof TOKEN_KIND)[keyof typeof TOKEN_KIND];
type TooltipKind = (typeof TOOLTIP_KIND)[keyof typeof TOOLTIP_KIND];

export interface Token<Kind extends string> {
  text: string;
  kind: Kind;
}

export type CodeLine = readonly Token<TokenKind>[];
export type TooltipLine = readonly Token<TooltipKind>[];

const k = (text: string): Token<TokenKind> => ({ text, kind: TOKEN_KIND.keyword });
const s = (text: string): Token<TokenKind> => ({ text, kind: TOKEN_KIND.string });
const p = (text: string): Token<TokenKind> => ({ text, kind: TOKEN_KIND.plain });

export const SNIPPET_FILE_NAME = "users.ts";

export const SNIPPET_LINES: readonly CodeLine[] = [
  [k("import"), p(" { db } "), k("from"), p(" "), s('"./db"')],
  [],
  [k("const"), p(" "), { text: "result", kind: TOKEN_KIND.hovered }, p(" = "), k("await"), p(" db.query(")],
  [p("  "), s("`SELECT id, email, created_at")],
  [s("   FROM users")],
  [s("   WHERE active = true`")],
  [p(")")],
];

export const TOOLTIP_AFTER_LINE_INDEX = 2;

const tp = (text: string): Token<TooltipKind> => ({ text, kind: TOOLTIP_KIND.plain });
const prim = (text: string): Token<TooltipKind> => ({ text, kind: TOOLTIP_KIND.primitive });

export const TOOLTIP_LINES: readonly TooltipLine[] = [
  [
    { text: "const", kind: TOOLTIP_KIND.keyword },
    tp(" "),
    { text: "result", kind: TOOLTIP_KIND.name },
    tp(": "),
    { text: "Result", kind: TOOLTIP_KIND.result },
    tp("<{"),
  ],
  [tp("    id: "), prim("number"), tp(";")],
  [tp("    email: "), prim("string"), tp(";")],
  [tp("    created_at: "), prim("Date"), tp(";")],
  [tp("}[], "), { text: "QueryError", kind: TOOLTIP_KIND.error }, tp(">")],
];
