"use client";
// components/CodeBlock.tsx
// Client Component — react-syntax-highlighter non supporta Server Components
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
  headerClassName?: string;
  langClassName?: string;
  bodyClassName?: string;
}

export default function CodeBlock({
  code,
  language = 'text',
  className,
  headerClassName,
  langClassName,
  bodyClassName,
}: CodeBlockProps) {
  return (
    <div className={className}>
      <div className={headerClassName}>
        <span className={langClassName}>{language}</span>
      </div>
      <div className={bodyClassName}>
        <SyntaxHighlighter
          language={language}
          style={coldarkDark}
          customStyle={{
            margin: 0,
            borderRadius: 0,
            fontSize: '0.82rem',
            lineHeight: '1.75',
          }}
          codeTagProps={{
            style: { fontFamily: 'inherit' },
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}