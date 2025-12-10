import dotenv from 'dotenv';
import { defineConfig } from 'orval';

dotenv.config({ path: '.env.local' });

const baseUrl = process.env.NEXT_PUBLIC_API_URL as string;
const url = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;

export default defineConfig({
  dapp: {
    input: `${url}/openapi.json`,
    output: {
      target: './src/shared/types/__generated/api',
      client: 'react-query',
      baseUrl: url,
    },
  },
});
