/// <reference types="vite/client" />

export const env = {
  PRODUCTS_BASE_URL: import.meta.env.VITE_PRODUCTS_BASE_URL as string,
  AUTH_BASE_URL: import.meta.env.VITE_AUTH_BASE_URL as string,
  API_KEY: (import.meta.env.VITE_API_KEY as string) || '',
} as const;

export function requireEnv(value: string | undefined, name: string): string {
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

export const config = {
  productsBaseUrl: requireEnv(env.PRODUCTS_BASE_URL, 'VITE_PRODUCTS_BASE_URL'),
  authBaseUrl: requireEnv(env.AUTH_BASE_URL, 'VITE_AUTH_BASE_URL'),
  apiKey: env.API_KEY,
} as const;


