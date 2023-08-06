// rollup.config.js

// Import rollup plugins
import { rollupPluginHTML as html } from "@web/rollup-plugin-html";
import { copy } from "@web/rollup-plugin-copy";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import minifyHTML from "rollup-plugin-minify-html-literals";
import summary from "rollup-plugin-summary";
import typescript from "@rollup/plugin-typescript";
import fs from "fs";

// Dynamically generate entry points based on the .ts files in src directory
const entries = {};
fs.readdirSync("src").forEach((file) => {
  if (file.endsWith(".ts")) {
    const name = file.split(".")[0];
    entries[name] = `src/${file}`;
  }
});

export default {
  input: entries,
  output: {
    dir: "build",
    format: "esm",
    entryFileNames: "[name].bundle.js",
    chunkFileNames: "shared.[name].js",
  },
  plugins: [
    // Entry point for application build; can specify a glob to build multiple
    // HTML files for non-SPA app
    // html({
    //   input: "index.html",
    // }),
    // Resolve bare module specifiers to relative paths
    resolve(),
    // Use TypeScript with Rollup
    typescript(),
    // Minify HTML template literals
    minifyHTML.default(),
    // Minify JS
    terser({
      ecma: 2020,
      module: true,
      warnings: true,
    }),
    // Print bundle summary
    summary(),
    // Optional: copy any static assets to build directory
    copy({
      patterns: ["images/**/*"],
    }),
  ],
  preserveEntrySignatures: "strict",
};
