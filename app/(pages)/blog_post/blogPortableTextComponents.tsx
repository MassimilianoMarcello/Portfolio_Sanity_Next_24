// app/(pages)/blog_post/[slug]/blogPortableTextComponents.tsx
import Image from 'next/image';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styles from './blog.module.scss';

export const blogPortableTextComponents = {

  // ─── Custom block types ─────────────────────────────────────────────────────
  types: {
    // Immagine inline nel PortableText
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

    // Blocco codice via @sanity/code-input
    code: ({ value }: { value: { code: string; language?: string } }) => (
      <div className={styles.codeBlock}>
        <div className={styles.codeBlockHeader}>
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

  // ─── Block styles ───────────────────────────────────────────────────────────
  block: {
    normal:     ({ children }: any) => <p className={styles.ptParagraph}>{children}</p>,
    h2:         ({ children }: any) => <h2 className={styles.ptH2}>{children}</h2>,
    h3:         ({ children }: any) => <h3 className={styles.ptH3}>{children}</h3>,
    h4:         ({ children }: any) => <h4 className={styles.ptH4}>{children}</h4>,
    blockquote: ({ children }: any) => <blockquote className={styles.ptBlockquote}>{children}</blockquote>,
  },

  // ─── Lists ──────────────────────────────────────────────────────────────────
  list: {
    bullet: ({ children }: any) => <ul className={styles.ptList}>{children}</ul>,
    number: ({ children }: any) => <ol className={`${styles.ptList} ${styles.ptListOrdered}`}>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => <li className={styles.ptListItem}>{children}</li>,
    number: ({ children }: any) => <li className={styles.ptListItem}>{children}</li>,
  },

  // ─── Inline marks ───────────────────────────────────────────────────────────
  marks: {
    strong: ({ children }: any) => <strong className={styles.ptStrong}>{children}</strong>,
    em:     ({ children }: any) => <em className={styles.ptEm}>{children}</em>,
    code:   ({ children }: any) => <code className={styles.ptInlineCode}>{children}</code>,
    link: ({ children, value }: any) => {
      const isExternal = value?.href && !value.href.startsWith('/');
      return (
        <a
          href={value?.href}
          className={styles.ptLink}
          {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {children}
          {isExternal && (
            <svg width="9" height="9" viewBox="0 0 10 10" fill="none"
              style={{ display: 'inline-block', marginLeft: '0.2em', verticalAlign: 'middle' }}>
              <path d="M2 8L8 2M8 2H3M8 2V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </a>
      );
    },
  },
};