declare global {
  // biome-ignore lint/style/noNamespace: <explanation>
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      NEXT_PUBLIC_API_KEY: string;
      NEXT_PUBLIC_VERCEL_URL: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
