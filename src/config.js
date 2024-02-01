import { config } from "dotenv";

config()

export const TOKEN_SECRET = 'some secrets';
export const URI = process.env.MONGODB_URI || '';
export const PORT = process.env.PORT || '4000';