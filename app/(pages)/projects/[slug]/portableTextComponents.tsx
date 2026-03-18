import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneLight } from "react-syntax-highlighter/dist/esm/styles/hljs";

const CodeBlock = ({ value }: { value: { code: string; language: string } }) => (
  <SyntaxHighlighter
    language={value.language}
    style={atomOneLight}
    customStyle={{
      backgroundColor: "#f4f2f9",
      borderRadius: "6px",
      padding: "1.5rem 2rem",
      fontSize: "0.82rem",
      lineHeight: "1.7",
      border: "1px solid rgba(145, 117, 186, 0.3)",
    }}
  >
    {value.code}
  </SyntaxHighlighter>
);

export const portableTextComponents = {
  types: {
    code: ({ value }: any) => <CodeBlock value={value} />,
  },
};


