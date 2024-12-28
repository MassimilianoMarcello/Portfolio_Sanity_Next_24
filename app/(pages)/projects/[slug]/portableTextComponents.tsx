import SyntaxHighlighter from "react-syntax-highlighter";
import { tomorrowNightBright } from "react-syntax-highlighter/dist/esm/styles/hljs";

// Componente per gestire i blocchi di codice
const CodeBlock = ({ value }: { value: { code: string; language: string } }) => (
  <SyntaxHighlighter
    language={value.language}
    style={tomorrowNightBright}
    customStyle={{
      backgroundColor: "#f5f5f5", // Cambia lo sfondo
      color: "#333",             // Cambia il colore del testo
      borderRadius: "8px",       // Aggiungi angoli arrotondati
      padding: "16px",           // Aggiungi padding
      fontSize: "14px",          // Cambia dimensione del testo
    }}
  >
    {value.code}
  </SyntaxHighlighter>
);

// Configurazione per PortableText
export const portableTextComponents = {
  types: {
    code: ({ value }: any) => <CodeBlock value={value} />, // Render blocchi di codice
  },
};


