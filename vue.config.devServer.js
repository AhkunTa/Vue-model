const express = require("express");
const httpProxyMiddleware = require("http-proxy-middleware")
  .createProxyMiddleware;
const replaceStream = require("replacestream");
// const merge = require("lodash").merge;

// process.env.APP_CONTEXT = "/test";

let { APP_CONTEXT } = process.env;

let Host = process.env.HOST || "http://localhost";

let mockServerPath = "/mock";

let onListening;
let getServeport = new Promise(resolve => {
  onListening = function(server) {
    let serverPort = server.listeningApp.address().port;
    resolve(serverPort);
  };
});

let apiProxyConfig = {
  pathRewrite(path, req) {
    let context = `/${req.baseUrl.split("/")[1]}`;
    let newPath = path.replace(
      new RegExp(`^${context}(.*)$`),
      `${mockServerPath}$1`
    );
    return newPath;
  },
  selfHandleResponse: true,
  async onProxyRes(proxyRes, req, res) {
    let contentType = proxyRes.headers["content-type"];
    if (/json/.test(contentType)) {
      res.set("content-type", contentType);
      proxyRes.pipe(replaceStream("${appContext}", APP_CONTEXT)).pipe(res);
    }
  }
};

let defferedProxy = function(options) {
  let promise = new Promise(async (resolve, reject) => {
    let port = await getServeport;

    let proxyConfig = {
      target: `${Host}:${port}`,
      logLevel: "silent",
      ...options
    };
    let proxy = httpProxyMiddleware(proxyConfig);
    resolve(proxy);
  });

  return async function(req, res, next) {
    let middleware = await promise;
    middleware(req, res, next);
  };
};

module.exports = {
  devServer: {
    compress: false,
    onListening,
    host: process.env.HOST,
    async before(app) {
      let staticMiddleware = express.static("mock", {
        dotfiles: "ignore",
        maxAge: 0
      });

      // mock数据 挂载中间件
      app.use(mockServerPath, function(req, res, next) {
        if (!["GET", "HEAD"].includes(req.method)) {
          req.method = "GET";
        }
        staticMiddleware(req, res, next);
      });

      // 接口数据反向代理
      app.use(`${APP_CONTEXT}/api`, defferedProxy({ ...apiProxyConfig }));
      // 远程接口跨域代理
      app.use(
        `/CROS`,
        httpProxyMiddleware({
          target: "https://v2.jinrishici.com/one.json",
          changeOrigin: true,
          // pathRewrite(path, req) {
          //   let context = `/${req.baseUrl.split('/')[1]}`;
          //   let newPath = path.replace(
          //     new RegExp(`^${context}(.*)$`),
          //     `${mockServerPath}$1`
          //   )
          //   console.log(context,newPath)
          //   return '';
          // },
          pathRewrite: { "^/CROS": "" }
        })
      );
    },
    open: process.env.OPEN_PAGE ? true : false,
    openPage: process.env.OPEN_PAGE
  }
};
