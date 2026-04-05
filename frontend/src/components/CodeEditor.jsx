import Editor from "@monaco-editor/react";

function CodeEditor({ code, setCode }) {
  return (
    <Editor
      height="400px"
      defaultLanguage="python"
      theme="vs-light"
      value={code}
      onChange={(value) => setCode(value)}
      options={{
        fontSize: 14,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        padding: { top: 10 },
      }}
    />
  );
}

export default CodeEditor;