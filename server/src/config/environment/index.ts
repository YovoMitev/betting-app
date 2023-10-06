import dotenv from 'dotenv';
dotenv.config();

const { NODE_PORT, CORS_DOMAINS } = process.env;
export { NODE_PORT, CORS_DOMAINS };
