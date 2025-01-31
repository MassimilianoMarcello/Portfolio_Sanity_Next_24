import SyntaxHighlighter from "react-syntax-highlighter";
import { docco} from "react-syntax-highlighter/dist/esm/styles/hljs";

// Componente per gestire i blocchi di codice
const CodeBlock = ({ value }: { value: { code: string; language: string } }) => (
  <SyntaxHighlighter
    language={value.language}
    style={docco}
    customStyle={{
      backgroundColor: "#f5f5f5", 
      color: "#333",             
      borderRadius: "25px",       
      padding: "2rem 2rem 2rem 4rem ",      
      fontSize: "14px",  
  
 
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


