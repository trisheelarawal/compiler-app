import Editor from "@monaco-editor/react";

function CodeEditor({ code, setCode, language }) {
  return (
    <Editor
      height="100%"
      language={language}
      value={code}
      onChange={(value) => setCode(value || "")}
      theme="vs-light" // matches your soft UI
      options={{
        fontSize: 14,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        padding: { top: 10 },
        automaticLayout: true,
        wordWrap: "on",
        smoothScrolling: true,
        cursorSmoothCaretAnimation: "on",
      }}
    />
  );
}

export default CodeEditor;