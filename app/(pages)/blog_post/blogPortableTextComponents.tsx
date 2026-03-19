// app/(pages)/blog_post/[slug]/blogPortableTextComponents.tsx
import Image from 'next/image';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type {
  PortableTextBlockComponent,
  PortableTextMarkComponent,
  PortableTextListComponent,
  PortableTextListItemComponent,
} from '@portabletext/react';
import styles from './blog.module.scss';

// ─── Shared slug helper ──────────────────────────────────────────────────────
export const slugifyHeading = (text: unknown): string => {
  if (!text) return '';
  const str = Array.isArray(text)
    ? text.map((c) => (typeof c === 'string' ? c : c?.text ?? '')).join('')
    : String(text);
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
};

// ─── Block styles ────────────────────────────────────────────────────────────
const H2: PortableTextBlockComponent = ({ children, value }) => {
  const id = slugifyHeading(value?.children?.map((c: any) => c.text));
  return <h2 id={id} className={styles.ptH2}>{children}</h2>;
};

const H3: PortableTextBlockComponent = ({ children, value }) => {
  const id = slugifyHeading(value?.children?.map((c: any) => c.text));
  return <h3 id={id} className={styles.ptH3}>{children}</h3>;
};

// ─── Inline marks ────────────────────────────────────────────────────────────
const LinkMark: PortableTextMarkComponent = ({ children, value }) => {
  const isExternal = value?.href && !value.href.startsWith('/');
  return (
    <a
      href={value?.href}
      className={styles.ptLink}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
      {isExternal && (
        <svg
          className={styles.ptLinkIcon}
          width="9" height="9" viewBox="0 0 10 10" fill="none"
          aria-hidden="true"
        >
          <path d="M2 8L8 2M8 2H3M8 2V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </a>
  );
};

// ─── List components ─────────────────────────────────────────────────────────
const BulletList: PortableTextListComponent    = ({ children }) => <ul className={styles.ptList}>{children}</ul>;
const NumberList: PortableTextListComponent    = ({ children }) => <ol className={`${styles.ptList} ${styles.ptListOrdered}`}>{children}</ol>;
const BulletItem: PortableTextListItemComponent = ({ children }) => <li className={styles.ptListItem}>{children}</li>;
const NumberItem: PortableTextListItemComponent = ({ children }) => <li className={styles.ptListItem}>{children}</li>;

// ─── Exported components map ─────────────────────────────────────────────────
export const blogPortableTextComponents = {

  types: {
    image: ({ value }: { value: { url: string; alt?: string; caption?: string } }) => (
      <figure className={styles.ptImage}>
        <div className={styles.ptImageWrap}>
          <Image
            src={value.url}
            alt={value.alt || ''}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className={styles.ptImageImg}
          />
        </div>
        {value.caption && (
          <figcaption className={styles.ptImageCaption}>{value.caption}</figcaption>
        )}
      </figure>
    ),

    code: ({ value }: { value: { code: string; language?: string } }) => (
      <div className={styles.codeBlock}>
        <div className={styles.codeBlockHeader}>
          <span className={styles.codeBlockDots} aria-hidden="true">
            <span /><span /><span />
          </span>
          <span className={styles.codeBlockLang}>{value.language || 'code'}</span>
        </div>
        <div className={styles.codeBlockBody}>
          <SyntaxHighlighter
            language={value.language || 'text'}
            style={coldarkDark}
            customStyle={{ margin: 0, borderRadius: 0, fontSize: '0.82rem', lineHeight: '1.75' }}
            codeTagProps={{ style: { fontFamily: 'inherit' } }}
          >
            {value.code}
          </SyntaxHighlighter>
        </div>
      </div>
    ),
  },

  block: {
    normal:     (({ children }) => <p className={styles.ptParagraph}>{children}</p>) as PortableTextBlockComponent,
    h2:         H2,
    h3:         H3,
    h4:         (({ children }) => <h4 className={styles.ptH4}>{children}</h4>) as PortableTextBlockComponent,
    blockquote: (({ children }) => <blockquote className={styles.ptBlockquote}>{children}</blockquote>) as PortableTextBlockComponent,
  },

  list: {
    bullet: BulletList,
    number: NumberList,
  },
  listItem: {
    bullet: BulletItem,
    number: NumberItem,
  },

  marks: {
    strong: (({ children }) => <strong className={styles.ptStrong}>{children}</strong>) as PortableTextMarkComponent,
    em:     (({ children }) => <em className={styles.ptEm}>{children}</em>) as PortableTextMarkComponent,
    code:   (({ children }) => <code className={styles.ptInlineCode}>{children}</code>) as PortableTextMarkComponent,
    link:   LinkMark,
  },
};