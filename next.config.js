const fs = require("fs");
const { join } = require("path");
const { promisify } = require("util");
const copyFile = promisify(fs.copyFile);

if (typeof require !== "undefined") {
  require.extensions[".less"] = () => {};
  require.extensions[".css"] = file => {};
}
const withSass = require("@zeit/next-sass");
const withCSS = require("@zeit/next-css");
const withMDX = require("@zeit/next-mdx")({
  extension: /\.mdx?$/
});
module.exports = withCSS(
  withSass(
    withMDX({
      pageExtensions: ["js", "jsx", "mdx"],
      exportPathMap: async function(
        defaultPathMap,
        { dev, dir, outDir, distDir, buildId }
      ) {
        if (dev) {
          return defaultPathMap;
        }
        // This will copy robots.txt from your project root into the out directory
        await copyFile(join(dir, "robots.txt"), join(outDir, "robots.txt"));
        return defaultPathMap;
      }
    })
  )
);
