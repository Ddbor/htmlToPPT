// prettier.config.js
/** @type {import('prettier').Config} */
export default {
  // 代码换行长度（默认 80，可根据需求调整）
  printWidth: 100,
  // 缩进空格数（推荐 2 或 4，保持项目统一）
  tabWidth: 2,
  // 是否使用制表符（false = 用空格）
  useTabs: false,
  // 语句末尾是否加分号（true/false 二选一，推荐 false 更简洁）
  semi: false,
  // 字符串是否用单引号（true = 单引号，false = 双引号）
  singleQuote: true,
  // 对象属性是否加引号（as-needed = 仅必要时加）
  quoteProps: "as-needed",
  // JSX 属性是否用单引号
  jsxSingleQuote: false,
  // 尾随逗号（es5 = 支持 ES5 语法的尾随逗号，如数组/对象）
  trailingComma: "es5",
  // 对象字面量的大括号之间是否加空格（{ foo: bar } 而非 {foo: bar}）
  bracketSpacing: true,
  // JSX 标签的反尖括号是否换行（false = 同一行，true = 换行）
  bracketSameLine: false,
  // 箭头函数参数是否加括号（avoid = 单个参数时不加，如 (x) => x → x => x）
  arrowParens: "avoid",
  // 范围格式化（仅格式化选中的代码，默认 false）
  rangeStart: 0,
  rangeEnd: Infinity,
  // 是否格式化嵌入在 HTML 中的代码
  embeddedLanguageFormatting: "auto",
  // 是否在文件末尾加空行（true = 加）
  endOfLine: "lf", // 换行符格式（lf = Unix 格式，crlf = Windows 格式，建议统一用 lf）
};
