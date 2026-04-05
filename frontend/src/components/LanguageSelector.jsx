function LanguageSelector({ language, setLanguage }) {
  return (
    <div style={{ textAlign: "center", marginBottom: "15px" }}>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        style={{
          padding: "8px 15px",
          borderRadius: "20px",
          border: "1px solid #f8cdd4",
          background: "#ffeef2",
          color: "#d17b88",
          fontWeight: "bold",
          outline: "none",
          cursor: "pointer",
        }}
      >
        <option value="python">Python</option>
        <option value="cpp">C++</option>
        <option value="java">Java</option>
      </select>
    </div>
  );
}

export default LanguageSelector;