// app/(pages)/projects/[slug]/portableTextComponents.tsx
import CodeBlock from './CodeBlock';
import styles from './singleProject.module.scss';

export const portableTextComponents = {

  types: {
    code: ({ value }: { value: { code: string; language?: string } }) => (
      <CodeBlock
        code={value.code}
        language={value.language}
        className={styles.codeBlock}
        headerClassName={styles.codeBlockHeader}
        dotsClassName={styles.codeBlockDots}
        langClassName={styles.codeBlockLang}
        bodyClassName={styles.codeBlockBody}
      />
    ),
  },

  block: {
    normal:     ({ children }: any) => <p className={styles.ptParagraph}>{children}</p>,
    lead:       ({ children }: any) => <p className={styles.ptLead}>{children}</p>,
    h1:         ({ children }: any) => <h1 className={styles.ptH1}>{children}</h1>,
    h2:         ({ children }: any) => <h2 className={styles.ptH2}>{children}</h2>,
    h3:         ({ children }: any) => <h3 className={styles.ptH3}>{children}</h3>,
    h4:         ({ children }: any) => <h4 className={styles.ptH4}>{children}</h4>,
    blockquote: ({ children }: any) => <blockquote className={styles.ptBlockquote}>{children}</blockquote>,
  },

  list: {
    bullet: ({ children }: any) => <ul className={styles.ptList}>{children}</ul>,
    // ↓ solo ptListOrdered — rimosso ptList che portava display:flex e interferiva col grid dei <li>
    number: ({ children }: any) => <ol className={styles.ptListOrdered}>{children}</ol>,
  },

  listItem: {
    bullet: ({ children }: any) => <li className={styles.ptListItem}>{children}</li>,
    // span wrapper — forza tutto il contenuto (testo + inline marks)
    // in grid-column 2, lasciando grid-column 1 al numero ::after del mixin
    number: ({ children }: any) => (
      <li className={styles.ptListItem}>
        <span className={styles.ptListItemText}>{children}</span>
      </li>
    ),
  },

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
    },
  },
};


