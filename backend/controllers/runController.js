import { runCodeService } from "../services/judge0Service.js";

export const runCode = async (req, res) => {
  const { code, language, input, testCases } = req.body;

  const languageMap = {
    python: 71,
    cpp: 54,
    java: 62,
  };

  try {
    // Validation
    if (!code || code.trim() === "") {
      return res.status(400).json({ error: "Code cannot be empty" });
    }

    if (!languageMap[language]) {
      return res.status(400).json({ error: "Unsupported language" });
    }

    console.log("Incoming body:", req.body);

    // =========================
    // TEST CASE MODE (FAIL FAST)
    // =========================
    if (testCases && testCases.length) {
      const results = [];
      let passedCount = 0;

      for (let i = 0; i < testCases.length; i++) {
        const test = testCases[i];

        const result = await runCodeService(
          code,
          languageMap[language],
          test.input || ""
        );

        const actualOutput = (result.stdout || "").trim();
        const expectedOutput = (test.expectedOutput || "").trim();

        const passed = actualOutput === expectedOutput;

        if (passed) {
          passedCount++;
          results.push({
            testCase: i + 1,
            input: test.input,
            expected: expectedOutput,
            output: actualOutput,
            passed: true,
          });
        } else {
          results.push({
            testCase: i + 1,
            input: test.input,
            expected: expectedOutput,
            output: actualOutput,
            passed: false,
          });

          return res.json({
            success: true,
            mode: "testcases",
            allPassed: false,
            passed: passedCount,
            total: testCases.length,
            failedAt: i + 1,
            results,
          });
        }
      }

      return res.json({
        success: true,
        mode: "testcases",
        allPassed: true,
        passed: passedCount,
        total: testCases.length,
        results,
      });
    }

    // =========================
    // SINGLE EXECUTION MODE
    // =========================
    const result = await runCodeService(
      code,
      languageMap[language],
      input || ""
    );

    return res.json({
      success: true,
      mode: "single",
      output: result.stdout,
      error: result.stderr || result.compile_output || null,
      status: result.status,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Execution failed",
    });
  }
};