import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  mode: {
    type: String, // "single" or "testcases"
  },
  input: {
    type: String,
  },
  output: {
    type: String,
  },
  error: {
    type: String,
  },
  testResults: [
    {
      testCase: Number,
      input: String,
      expected: String,
      output: String,
      passed: Boolean,
    },
  ],
  passed: {
    type: Number,
  },
  total: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Submission", submissionSchema);