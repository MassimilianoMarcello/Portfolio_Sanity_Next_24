"use client";
// app/(pages)/projects/[slug]/CodeBlock.tsx
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
  headerClassName?: string;
  dotsClassName?: string;
  langClassName?: string;
  bodyClassName?: string;
}

export default function CodeBlock({
  code,
  language = 'text',
  className,
  headerClassName,
  dotsClassName,
  langClassName,
  bodyClassName,
}: CodeBlockProps) {
  return (
    <div className={className}>
      <div className={headerClassName}>
        <span className={dotsClassName} aria-hidden="true">
          <span /><span /><span />
        </span>
        <span className={langClassName}>{language}</span>
      </div>
      <div className={bodyClassName}>
        <SyntaxHighlighter
          language={language}
          style={coldarkDark}
          customStyle={{ margin: 0, borderRadius: 0, fontSize: '0.82rem', lineHeight: '1.75' }}
          codeTagProps={{ style: { fontFamily: 'inherit' } }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}