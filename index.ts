#!/usr/bin/env node

/**
 * Hexo Minifier Esbuild
 * Use esbuild to minify your files in Hexo public directory.
 * @author Redish101 <i@redish101.top>
 * @license MIT
 */

import fs from "fs/promises";
import path from "path";
import esbuild from "esbuild";
import { swcPlugin } from "esbuild-plugin-swc";
import htmlMinifierTerser from "html-minifier-terser";
import Fontmin from "fontmin";

const extensions = [".html", ".js", ".css"];
const publicDir = "./public";

async function processFiles(dirPath: string) {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const filePath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      await processFiles(filePath);
    } else {
      const ext = path.extname(filePath);

      if (extensions.includes(ext)) {
        if (ext === ".js") {
          await esbuild.build({
            entryPoints: [filePath],
            outfile: filePath,
            minify: true,
            write: true,
            allowOverwrite: true,
            plugins: [swcPlugin({
              module: {
                strictMode: false,
                type: "umd" 
              }
            })],
          });
          console.log(`${filePath} minified`);
        } else if (ext === ".css") {
          await esbuild.build({
            entryPoints: [filePath],
            outfile: filePath,
            minify: true,
            write: true,
            allowOverwrite: true,
            loader: { ".css": "css" },
          });
        } else if (ext === ".html") {
          const data = await fs.readFile(filePath, "utf-8");
          const minifiedData = await htmlMinifierTerser.minify(data, {
            collapseWhitespace: true,
            removeComments: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
          });
          await fs.writeFile(filePath, minifiedData, "utf-8");
          console.log(`${filePath} minified`);
        } else if (ext === ".ttf" || ext === ".otf") {
          const fontmin = new Fontmin();
          const destPath = path.dirname(filePath);
          fontmin.src(filePath).dest(destPath);
          await new Promise((resolve, reject) => {
            fontmin.run((err, files) => {
              if (err) {
                reject(err);
              } else {
                resolve(files);
                console.log(`${filePath} compressed`);
              }
            });
          });
        }
      }
    }
  }
}

processFiles(publicDir).catch((err) => {
  console.error("Error processing files:", err);
  process.exit(1);
});
