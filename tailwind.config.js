/** @type {import('tailwindcss').Config} */
export default {
  // 仅扫描 doc/src 下的 React 组件（.tsx/.jsx）和 HTML 文件
  content: [
    "./doc/src/**/*.{html,tsx,jsx,ts,js}", // 测试页面的所有相关文件
  ],
  theme: {
    extend: {}, // 可在这里扩展 Tailwind 主题（如自定义颜色、字体等）
  },
  plugins: [], // 可添加 Tailwind 插件（如表单、动画等）
};
