import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Ensures assets are linked relatively for deployment on subpaths
  define: {
    // The API key is now embedded as a fallback. 
    // It prioritizes the environment variable if set (e.g. via GitHub Secrets), 
    // otherwise it uses the key you provided.
    'process.env.API_KEY': JSON.stringify(process.env.GEMINI_API_KEY)
  }
});