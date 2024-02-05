/* eslint-disable @typescript-eslint/promise-function-async */
import eslintPlugin from "@nabla/vite-plugin-eslint";
import react from "@vitejs/plugin-react-swc";
// import { defineConfig, loadEnv } from "vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default ({ mode }: { mode: string }) => {
  // process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [react(), tsconfigPaths(), eslintPlugin({})],
    server: {
      port: 3000,
      // proxy: {
      //   "/api": {
      //     target: process.env.VITE_API_PROXY_URL,
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/api/, ""),
      //     secure: false,
      //   },
      // },
    },
  });
};
