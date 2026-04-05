import axios from "axios";

export const runCodeService = async (code, languageId) => {
  try {
    const response = await axios.post(
      "https://ce.judge0.com/submissions?base64_encoded=false&wait=true",
      {
        source_code: code,
        language_id: languageId,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error.response?.data || error.message);
    throw new Error("Code execution failed");
  }
};