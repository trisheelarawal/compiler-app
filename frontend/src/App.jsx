import { useState, useEffect } from "react";
import LanguageSelector from "./components/LanguageSelector";
import CodeEditor from "./components/CodeEditor";
import { runCode, getHistory } from "./services/api";

function App() {
  const [code, setCode] = useState("print('hello world')");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("python");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const handleRun = async () => {
    setLoading(true);
    try {
      const result = await runCode(code, language);
      setOutput(result);
      fetchHistory();
    } catch (err) {
      setOutput("Error running code");
    }
    setLoading(false);
  };

  const fetchHistory = async () => {
    try {
      const data = await getHistory();
      setHistory(data);
    } catch (err) {
      console.log("Error fetching history");
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  // 🧠 Helper for clean timestamp
  const formatTime = (time) => {
    return new Date(time).toLocaleString();
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        backgroundColor: "#fdf6f9",
        fontFamily: "sans-serif",
      }}
    >
      {/* HISTORY SIDEBAR */}
      <div
        style={{
          width: "250px",
          background: "#fff",
          borderRight: "1px solid #f8cdd4",
          padding: "15px",
          overflowY: "auto",
        }}
      >
        <h3 style={{ color: "#d17b88", marginBottom: "10px" }}>
          History
        </h3>

        {history.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              setCode(item.code);
              setOutput(item.output || item.error);
              setLanguage(item.language);
            }}
            style={{
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "10px",
              cursor: "pointer",
              background: "#ffeef2",
              border: "1px solid #f8cdd4",
              fontSize: "12px",
            }}
          >
            {/* Language */}
            <div><b>{item.language}</b></div>

            {/* Status */}
            <div style={{ fontSize: "10px" }}>
              {item.error ? (
                <span style={{ color: "red" }}>❌ Error</span>
              ) : (
                <span style={{ color: "green" }}>✅ Success</span>
              )}
            </div>

            {/* Timestamp */}
            <div style={{ fontSize: "10px", color: "#888" }}>
              {formatTime(item.createdAt)}
            </div>

            {/* Code preview */}
            <div>
              {item.code.slice(0, 30)}...
            </div>
          </div>
        ))}
      </div>

      {/* MAIN AREA */}
      <div
        style={{
          flex: 1,
          padding: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Top Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <h1 style={{ color: "#d17b88" }}>Online Code Compiler</h1>

          <div style={{ display: "flex", gap: "10px" }}>
            <LanguageSelector
              language={language}
              setLanguage={setLanguage}
            />

            <button
              onClick={handleRun}
              disabled={loading}
              style={{
                padding: "10px 20px",
                background: "#ff8fa3",
                border: "none",
                borderRadius: "25px",
                color: "white",
                fontWeight: "bold",
                cursor: "pointer",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Running..." : "Run ▶"}
            </button>
          </div>
        </div>

        {/* Editor + Output */}
        <div style={{ display: "flex", gap: "20px", flex: 1 }}>
          {/* Editor */}
          <div
            style={{
              flex: 1,
              background: "#ffeef2",
              padding: "20px",
              borderRadius: "20px",
              border: "1px solid #f8cdd4",
            }}
          >
            <CodeEditor
              code={code}
              setCode={setCode}
              language={language}
            />
          </div>

          {/* Output */}
          <div
            style={{
              flex: 1,
              background: "#fff",
              padding: "20px",
              borderRadius: "20px",
              border: "1px solid #f8cdd4",
            }}
          >
            <h3 style={{ color: "#d17b88" }}>Output</h3>
            <pre>
              {output || "Your output will appear here..."}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;