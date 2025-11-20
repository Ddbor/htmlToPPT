import { defineConfig } from "vite";
import path from "path";
import dts from "vite-plugin-dts"; // 生成类型定义（需安装：pnpm add -D vite-plugin-dts）

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"), // 库入口
      name: "htmlToPPT", // UMD模块全局变量名（script标签引入时使用）
      fileName: (format) => {
        // 自定义输出文件名
        switch (format) {
          case "es":
            return "html-to-ppt.es.js";
          case "cjs":
            return "html-to-ppt.cjs.js";
          case "umd":
            return "html-to-ppt.umd.js";
          default:
            return `html-to-ppt.${format}.js`;
        }
      },
      formats: ["es", "cjs", "umd"], // 打包3种格式，满足不同引入方式
    },
    rollupOptions: {
      // 外部依赖（不打包进库）
      external: [],
      output: {
        // 全局变量映射（如果外部依赖需要全局变量）
        globals: {},
      },
    },
  },
  plugins: [
    dts({
      // 生成类型定义文件
      entryRoot: path.resolve(__dirname, "src"),
      outDir: path.resolve(__dirname, "dist"),
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // 别名配置
    },
  },
});
