import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.js",
      format: "esm",
      exports: "named",
    },
    {
      file: "dist/cjs/index.js",
      format: "cjs",
      exports: "named",
    },
  ],
  plugins: [
    typescript({
      tsconfig: "./tsconfig.json",
      outputToFilesystem: true,
      declaration: false,
      declarationDir: undefined,
      sourceMap: false,
      compilerOptions: {
        outDir: "dist",
      },
    }),
    terser(),
  ],
  external: [
    "@kinde-oss/kinde-typescript-sdk",
    "@remix-run/node",
    "universal-cookie",
  ],
  // Allow rollup to resolve .ts files and handle extensions
  onwarn: (warning, warn) => {
    // Skip certain warnings
    if (warning.code === "UNRESOLVED_IMPORT") return;
    // Use default for everything else
    warn(warning);
  },
};
