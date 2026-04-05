import axios from "axios";

export const runCode = async (code, language) => {
  try {
    const res = await axios.post("http://localhost:5000/api/run", {
      code,
      language,
    });

    return res.data.output;
  } catch (error) {
    return "Error running code";
  }
};