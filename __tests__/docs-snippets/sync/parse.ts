import fs from 'node:fs';
import path from 'node:path';
import { format } from 'prettier';
import type { Options } from 'prettier';

/** `content/docs` in a getstream.io checkout (override with DOCS_DIR). */
export const DOCS_DIR = path.resolve(
  process.env.DOCS_DIR ??
    path.join(__dirname, '../../../../getstream.io/content/docs'),
);

/** Identifies one code fence on a docs page. */
export type FenceKey = {
  /** Page path relative to `content/docs`, e.g. `chat/_default/04-messages/01-send_message.md`. */
  docs: string;
  /** Text of the nearest heading above the fence (`""` before the first heading). */
  heading: string;
  /** The fence's `label="..."`, or `unlabelled`. */
  tab: string;
  /** 1-based position among the fences with the same heading text and tab on the page. */
  index: number;
};

export type DocsFence = FenceKey & {
  /** The fence language as written (`js`, `javascript`, `ts`, `typescript`). */
  lang: string;
  /** Fence body, de-indented. */
  code: string;
  /** 1-based line of the opening ``` line. */
  line: number;
  /** 0-based line range of the body in the file (end exclusive), plus the fence indent. */
  bodyStart: number;
  bodyEnd: number;
  indent: string;
  /** The body is only comments (e.g. a "server-side only" placeholder): nothing to test. */
  commentOnly: boolean;
  /** Inside a `<disclosure label="... (no SDK)">` block: a reference implementation that doesn't use the SDK. */
  noSdk: boolean;
};

export type TestRegion = FenceKey & {
  /** Code between the markers, de-indented, without marker / COPY lines. */
  code: string;
  /** Values the test uses in place of the docs literals: identifier -> JS literal. */
  copy: Record<string, string>;
  file: string;
  line: number;
};

export const fenceId = (key: FenceKey) =>
  `${key.docs} > "${key.heading}" > ${key.tab} #${key.index}`;

const JS_LANGS = new Set(['js', 'javascript', 'ts', 'typescript']);
/** Out of scope (client-side `stream-chat` code). */
export const JS_TAB = 'JavaScript';
/** The tested tab (`@stream-io/node-sdk` code). */
export const NODE_TAB = 'Node.js';
/**
 * Out of scope too: client-side React / React Native SDK code, and the stream-chat@9
 * versions shown next to `JavaScript` (client-side) and `Node.js` (server-side).
 */
const OUT_OF_SCOPE_TABS = [
  'React',
  'React Native',
  'JavaScript (stream-chat@9)',
  'Node.js (stream-chat@9)',
];
/**
 * Opens a block of reference implementations that don't use the SDK (platform pages).
 * Its `Node.js` fences are out of scope.
 */
const NO_SDK_DISCLOSURE_RE =
  /^\s*<disclosure\b[^>]*label="[^"]*\(no SDK\)[^"]*"/i;
/** Every JS fence must carry one of these labels. */
export const ALLOWED_JS_LABELS = [JS_TAB, NODE_TAB, ...OUT_OF_SCOPE_TABS];

/**
 * Sidebars whose pages' `Node.js` fences are tested: the chat, activity feeds (v3) and
 * moderation Node sidebars, the video API (server-side) sidebar, and the platform docs
 * (shared by all SDKs).
 */
const SIDEBAR_FILES = [
  '[chat][node].json',
  '[activity-feeds][node][v3].json',
  '[moderation][node].json',
  '[video][api].json',
  '[platform][default].json',
];
/** Sidebar entries outside these docs are ignored. */
const PAGE_PREFIXES = [
  'chat/',
  'activity-feeds/',
  'moderation/',
  'video/',
  'platform/',
];

/**
 * Sidebar pages that are deliberately not validated (page path relative to
 * `content/docs`, reason).
 */
export const EXCLUDED_PAGES: Record<string, string> = {
  'activity-feeds/v3-latest/_default/13-importing_data/03_v2_to_v3_code_migration.md':
    'Feeds v2 to v3 porting guide: before/after code in fences titled "Feeds v2" / "Feeds v3", not SDK tabs (a `label` would replace the visible title)',
};

const FEEDS_V2_CLIENT =
  'Feeds v2 code for the `getstream` package (a different SDK), not @stream-io/node-sdk';

/**
 * `Node.js` fences that are deliberately not tested (fence id as printed by `fenceId`,
 * reason): code for another SDK that the docs label `Node.js`. They are not ours to
 * update. Both checks skip them, and the label check accepts their label.
 */
export const EXCLUDED_FENCES: Record<string, string> = {
  'moderation/_default/02-quick-start/03-quick-start-feeds-moderation.md > "Flag User" > Node.js #1':
    FEEDS_V2_CLIENT,
  'moderation/_default/02-quick-start/03-quick-start-feeds-moderation.md > "Flag Activity" > Node.js #1':
    FEEDS_V2_CLIENT,
  'moderation/_default/02-quick-start/03-quick-start-feeds-moderation.md > "Flag Reaction" > Node.js #1':
    FEEDS_V2_CLIENT,
};

const dedent = (lines: string[]) => {
  const indents = lines
    .filter((line) => line.trim())
    .map((line) => /^\s*/.exec(line)?.[0].length ?? 0);
  const min = indents.length ? Math.min(...indents) : 0;
  return lines
    .map((line) => line.slice(min))
    .join('\n')
    .trim();
};

/** True when the code has comments only (line and block comments), no statements. */
export const isCommentOnly = (code: string) =>
  code.trim() !== '' &&
  code
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .split('\n')
    .every((line) => !line.trim() || line.trim().startsWith('//'));

/**
 * All JS fences (`js`/`javascript`/`ts`/`typescript`) of a docs page, keyed the same way
 * as the test markers. Includes `JavaScript` and unlabelled fences (for the label check);
 * only `Node.js` fences outside no-SDK disclosures are tested.
 */
export const parseDocsFences = (
  docs: string,
  markdown: string,
): DocsFence[] => {
  const lines = markdown.split('\n');
  const fences: DocsFence[] = [];
  const counts = new Map<string, number>();
  let heading = '';
  let noSdk = false;
  // Label of the enclosing `<tabs-item label="...">` (video docs), for fences without one.
  let tabsItemLabel: string | undefined;
  for (let i = 0; i < lines.length; i++) {
    const open = /^(\s*)(`{3,})(\S*)(.*)$/.exec(lines[i]);
    if (!open) {
      const h = /^#{1,6}\s+(.*?)\s*#*\s*$/.exec(lines[i]);
      if (h) heading = h[1];
      if (NO_SDK_DISCLOSURE_RE.test(lines[i])) noSdk = true;
      else if (/^\s*<\/disclosure>/i.test(lines[i])) noSdk = false;
      const item = /^\s*<tabs-item\b[^>]*\blabel="([^"]*)"/i.exec(lines[i]);
      if (item) tabsItemLabel = item[1];
      else if (/^\s*<\/tabs-item>/i.test(lines[i])) tabsItemLabel = undefined;
      continue;
    }
    const [, indent, ticks, lang, rest] = open;
    let end = i + 1;
    while (
      end < lines.length &&
      !new RegExp(`^\\s*${ticks}\\s*$`).test(lines[end])
    )
      end++;
    const tab =
      /label="([^"]*)"/.exec(rest)?.[1] ?? tabsItemLabel ?? 'unlabelled';
    if (JS_LANGS.has(lang.toLowerCase())) {
      const countKey = `${heading}\u0000${tab}`;
      const index = (counts.get(countKey) ?? 0) + 1;
      counts.set(countKey, index);
      const code = dedent(lines.slice(i + 1, end));
      fences.push({
        docs,
        heading,
        tab,
        index,
        lang,
        code,
        commentOnly: isCommentOnly(code),
        noSdk,
        line: i + 1,
        bodyStart: i + 1,
        bodyEnd: end,
        indent,
      });
    }
    i = end;
  }
  return fences;
};

const ATTR_RE = /(\w+)=("(?:[^"\\]|\\.)*"|\d+)/g;

const parseAttrs = (text: string) => {
  const attrs: Record<string, string> = {};
  for (const [, key, raw] of text.matchAll(ATTR_RE)) {
    attrs[key] = raw.startsWith('"') ? (JSON.parse(raw) as string) : raw;
  }
  return attrs;
};

/** `// COPY: channelId="general", limit=10` -> { channelId: '"general"', limit: '10' } */
export const parseCopy = (text: string) => {
  const copy: Record<string, string> = {};
  for (const [, key, raw] of text.matchAll(
    /(\w+)=("(?:[^"\\]|\\.)*"|[^,\s]+)/g,
  )) {
    copy[key] = raw;
  }
  return copy;
};

const keyFromAttrs = (
  attrs: Record<string, string>,
  where: string,
): FenceKey => {
  for (const required of ['docs', 'heading', 'tab']) {
    if (attrs[required] === undefined) {
      throw new Error(`${where}: marker is missing ${required}="..."`);
    }
  }
  return {
    docs: attrs.docs,
    heading: attrs.heading,
    tab: attrs.tab,
    index: attrs.index ? Number(attrs.index) : 1,
  };
};

/**
 * Snippet regions of a test file:
 *
 * ```ts
 * // #region snippet docs="chat/_default/04-messages/01-send_message.md" heading="Sending a Message" tab="Node.js" index=1
 * // COPY: channelId="general", userId="john"
 * ...docs code...
 * // #endregion snippet
 * ```
 */
export const parseTestRegions = (
  file: string,
  source: string,
): TestRegion[] => {
  const lines = source.split('\n');
  const regions: TestRegion[] = [];
  for (let i = 0; i < lines.length; i++) {
    const where = `${file}:${i + 1}`;
    const start = /^\s*\/\/ #region snippet\s+(.*)$/.exec(lines[i]);
    if (!start) continue;
    const key = keyFromAttrs(parseAttrs(start[1]), where);
    let end = i + 1;
    while (
      end < lines.length &&
      !/^\s*\/\/ #endregion snippet/.test(lines[end])
    )
      end++;
    if (end === lines.length)
      throw new Error(`${where}: missing // #endregion snippet`);
    const body = lines.slice(i + 1, end);
    const copy: Record<string, string> = {};
    while (body.length && /^\s*\/\/ COPY:/.test(body[0])) {
      Object.assign(
        copy,
        parseCopy((body.shift() as string).replace(/^\s*\/\/ COPY:/, '')),
      );
    }
    regions.push({
      ...key,
      code: dedent(body),
      copy,
      file,
      line: i + 1,
    });
    i = end;
  }
  return regions;
};

/**
 * Applies the COPY values: every identifier `name` that is not a property access
 * (`x.name`) or an object key (`name:`) is replaced with its docs literal.
 * Don't use COPY identifiers in shorthand properties (`{ userId }`).
 */
export const applyCopy = (code: string, copy: Record<string, string>) =>
  Object.entries(copy).reduce(
    (result, [name, literal]) =>
      result.replace(
        new RegExp(`(?<![\\w$.'"\`])${name}(?![\\w$'"\`])(?!\\s*:(?!:))`, 'g'),
        literal,
      ),
    code,
  );

const COMPARE_OPTIONS: Options = {
  parser: 'typescript',
  singleQuote: false,
  semi: true,
  printWidth: 80,
  trailingComma: 'all',
  // Prettier keeps an object expanded once it is broken over lines, so a one-line docs call
  // wrapped at test indentation would never match again: collapse what fits on one line.
  objectWrap: 'collapse',
};

/**
 * Formats code the same way on both sides so only real differences count. Fragments
 * prettier can't parse fall back to whitespace / quote normalization.
 */
export const normalize = async (code: string) => {
  try {
    return (await format(code, COMPARE_OPTIONS)).trim();
  } catch {
    return code
      .replace(/'/g, '"')
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .join('\n')
      .replace(/,(\s*[)\]}])/g, '$1');
  }
};

/** Formats a snippet the way the docs repo would (its .prettierrc.json, double quotes). */
export const formatForDocs = async (code: string, markdownFile: string) => {
  const { resolveConfig } = await import('prettier');
  const config = (await resolveConfig(markdownFile)) ?? {};
  try {
    return (await format(code, { ...config, parser: 'typescript' })).trim();
  } catch {
    return code;
  }
};

type SidebarItem = {
  markdown?: string;
  children?: SidebarItem[];
  /** Name of a shared item (or item list) in `_sidebars/fragments/<name>.json`. */
  $fragment?: string;
};

/**
 * Pages of the tested sidebars (paths relative to `content/docs`), minus
 * `EXCLUDED_PAGES`.
 */
export const findSidebarPages = () => {
  const pages = new Set<string>();
  const walk = (entries: SidebarItem[] = []) => {
    for (const entry of entries) {
      const page = entry.markdown;
      if (page && PAGE_PREFIXES.some((prefix) => page.startsWith(prefix)))
        pages.add(page);
      if (entry.$fragment) {
        const fragment = path.join(
          DOCS_DIR,
          '_sidebars',
          'fragments',
          `${entry.$fragment}.json`,
        );
        // A fragment is one item or a list of items.
        const items = JSON.parse(fs.readFileSync(fragment, 'utf8')) as
          SidebarItem | SidebarItem[];
        walk(Array.isArray(items) ? items : [items]);
      }
      walk(entry.children);
    }
  };
  for (const sidebar of SIDEBAR_FILES) {
    const file = path.join(DOCS_DIR, '_sidebars', sidebar);
    const { items } = JSON.parse(fs.readFileSync(file, 'utf8')) as {
      items: SidebarItem[];
    };
    walk(items);
  }
  return [...pages].filter((page) => !(page in EXCLUDED_PAGES)).sort();
};

export const readDocsPage = (docs: string) => {
  const file = path.join(DOCS_DIR, docs);
  return { file, markdown: fs.readFileSync(file, 'utf8') };
};

/** Every *.test.ts under pages/. */
export const findTestFiles = (root = path.join(__dirname, '..')) => {
  const files: string[] = [];
  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith('.test.ts')) files.push(full);
    }
  };
  if (fs.existsSync(path.join(root, 'pages'))) walk(path.join(root, 'pages'));
  return files.sort();
};
