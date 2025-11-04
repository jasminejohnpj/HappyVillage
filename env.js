import dotenv from "dotenv";

dotenv.config({ path: .env.${process.env.NODE_ENV || 'development'}.local });

export const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const DB_URI = process.env.DB_URI;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;