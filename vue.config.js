const path = require("path");
let appContext = process.env.APP_CONTEXT;
let outputBaseDir = "assets";
// const testPlugin = require("testPlugin");

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
  configureWebpack: {},
  // module: {
  //   rules: [
  //     {
  //       test: /\.sass$/,
  //       // use:
  //       use: [
  //         "vue-style-loader",
  //         "css-loader",
  //         {
  //           loader: "sass-loader",
  //           options: {
  //             indentedSyntax: true,
  //             // sass-loader version >= 8
  //             sassOptions: {
  //               indentedSyntax: true
  //             }
  //           }
  //         }
  //       ]
  //     }
  //   ]
  // },
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
    // config.module
    //   .rule("sass")
    //   .test(/\.s[ac]ss$/i)
    //   .use("style-loader")
    //   .use("css-loader")
    //   .use("sass-loader")
    //   .tap(option => {
    //     return {
    //       ...option,
    //       sourceMap: true
    //     };
    //   });
    // config.when(NODE_ENV === "production", config => {
    //   config.plugin("testPlugin");
    // });
  }
};
