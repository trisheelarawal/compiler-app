import { useState } from "react";
import LanguageSelector from "./components/LanguageSelector";
import CodeEditor from "./components/CodeEditor";
import { runCode } from "./services/api";

function App() {
  const [code, setCode] = useState("print('hello world')");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("python");
  const [loading, setLoading] = useState(false);

  const handleRun = async () => {
    setLoading(true);
    const result = await runCode(code, language);
    setOutput(result);
    setLoading(false);
  };

  return (
    <div
      style={{
        backgroundColor: "#fdf6f9",
        minHeight: "100vh",
        padding: "30px",
        fontFamily: "sans-serif",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#d17b88",
          marginBottom: "20px",
        }}
      >
        Online Code Compiler
      </h1>

      {/* Language Selector */}
      <LanguageSelector language={language} setLanguage={setLanguage} />

      {/* Editor Card */}
      <div
        style={{
          background: "#ffeef2",
          padding: "20px",
          borderRadius: "20px",
          border: "1px solid #f8cdd4",
          boxShadow: "0 8px 25px rgba(244, 166, 176, 0.2)",
        }}
      >
        <CodeEditor code={code} setCode={setCode} />
      </div>

      {/* Run Button */}
      <div style={{ textAlign: "center" }}>
        <button
          onClick={handleRun}
          disabled={loading}
          style={{
            marginTop: "20px",
            padding: "10px 25px",
            background: "#ff8fa3",
            border: "none",
            borderRadius: "25px",
            color: "white",
            fontWeight: "bold",
            cursor: loading ? "not-allowed" : "pointer",
            boxShadow: "0 4px 10px rgba(255, 143, 163, 0.4)",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Running..." : "Run Code"}
        </button>
      </div>

      {/* Output Card */}
      <div
        style={{
          marginTop: "25px",
          background: "#fff",
          padding: "20px",
          borderRadius: "20px",
          border: "1px solid #f8cdd4",
          boxShadow: "0 8px 25px rgba(0,0,0,0.05)",
        }}
      >
        <h3 style={{ color: "#d17b88", marginBottom: "10px" }}>
          Output
        </h3>
        <pre style={{ color: "#444" }}>
          {output || "Your output will appear here..."}
        </pre>
      </div>
    </div>
  );
}

export default App;