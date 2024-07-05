import fs from "fs/promises";
import path from "path";
import esbuild from "esbuild";
import { swcPlugin } from 'esbuild-plugin-swc'
import htmlMinifier from "html-minifier";

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
            plugins: [swcPlugin()],
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
          const minifiedData = htmlMinifier.minify(data, {
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
        }
      }
    }
  }
}

processFiles(publicDir).catch((err) => {
  console.error("Error processing files:", err);
  process.exit(1);
});
