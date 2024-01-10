export default {
  input: "src/index.js",
  output: [
    {
      file: "dist/index.js",
      format: "esm",
    },
    {
      file: "dist/cjs/index.js",
      format: "cjs",
    },
  ],
};
