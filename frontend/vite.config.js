
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {

  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target: "http://localhost:7800",
          changeOrigin: true, // Optional: for virtual hosted sites
          secure: true, // Optional: if you're using self-signed certificates
        },
      },
    },
    define: {
      // You can define additional variables to be used in your app
      __APP_ENV__: JSON.stringify(env.VITE_PUBLISHER_KEY), // Example usage of an env variable
    },
  };
});



