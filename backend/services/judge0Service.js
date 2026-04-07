import axios from "axios";

export const runCodeService = async (code, languageId, input = "") => {
  try {
    console.log("Sending request to Judge0...");

    const response = await axios.post(
      "https://ce.judge0.com/submissions?base64_encoded=false&wait=true",
      {
        source_code: code,
        language_id: languageId,
        stdin: input,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 10000, // ⏱ prevents hanging
      }
    );

    const data = response.data;

    console.log("Judge0 response received");

    return {
      stdout: data.stdout,
      stderr: data.stderr,
      compile_output: data.compile_output,
      status: data.status?.description,
      time: data.time,
      memory: data.memory,
    };
  } catch (error) {
    console.error("Judge0 ERROR:", error.message);

    return {
      stdout: null,
      stderr: "Execution failed (Judge0 issue)",
      status: "Error",
    };
  }
};