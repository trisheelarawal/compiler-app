import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  judge0ApiKey: process.env.JUDGE0_API_KEY,
  judge0Host: process.env.JUDGE0_HOST,
};