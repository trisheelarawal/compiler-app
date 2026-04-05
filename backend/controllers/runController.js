import { runCodeService } from "../services/judge0Service.js";

export const runCode = async (req, res) => {
  const { code, language } = req.body;

  const languageMap = {
    python: 71,
    cpp: 54,
    java: 62,
  };

  try {
    const result = await runCodeService(code, languageMap[language]);

    res.json({
      output: result.stdout || result.stderr || "No output",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};