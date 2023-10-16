import dotenv from 'dotenv';
dotenv.config();

const { NODE_PORT, CORS_DOMAINS, SESSION_SECRET = '' } = process.env;
export { NODE_PORT, CORS_DOMAINS, SESSION_SECRET };
