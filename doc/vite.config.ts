import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  root: path.resolve(__dirname, "src"), // 测试页面根目录（src下的index.html）
  base: "./", // 打包后支持相对路径访问
  build: {
    outDir: path.resolve(__dirname, "../doc-dist"), // 测试页面输出目录
    emptyOutDir: true, // 每次打包清空目录
  },
  server: {
    port: 3333, // 开发服务器端口
    // open: true, // 自动打开浏览器
  },
  plugins: [react(), tailwindcss()], // React插件
  resolve: {
    alias: {
      "@doc": path.resolve(__dirname, "src"), // 测试页面内部别名
      "@lib": path.resolve(__dirname, "../src"), // 直接引用库源代码（开发时热更新）
    },
  },
});
