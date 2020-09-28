const path = require("path");
let appContext = process.env.APP_CONTEXT;
let outputBaseDir = "assets";

function fullPath(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  productionSourceMap: true,
  publicPath: appContext,
  outputDir: outputBaseDir,
  assetsDir: "assets",
  css: {
    sourceMap: true
  },
  chainWebpack: config => {
    config.resolve.alias
      .set("@", fullPath("src"))
      .set("@views", fullPath("src/views"))
      .set("@plugins", fullPath("src/plugins"))
      .set("@utils", fullPath("src/utils"))
      .set("@configs", fullPath("src/configs"))
      .set("@components", fullPath("src/components"))
      .set("@store", fullPath("src/store"));

    config.when(process.env.target === "TEST", config => {
      config.merge(require("./vue.config.devServer.js"));
    });
  }
};
