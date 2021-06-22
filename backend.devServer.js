const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const path = require("path");
const fs = require("fs");
const url = require("url");
const defaultConfig = require("./backend.config.js");
const app = express();

global.appConfig = app.locals.config = Object.assign({}, defaultConfig);
global.appDir = __dirname;

// 数据接口反向代理
let mockServer = "/mock";
app.use(
  "/api/**/*.json",
  createProxyMiddleware({
    target: `http://localhost:${global.appConfig.port}`,
    changeOrigin: true,
    pathRewrite: function(path, req) {
      return path.replace("/api", mockServer);
    },
    async onProxyRes(proxyRes, req, res) {},
    onError(err) {
      console.log(err);
    }
  })
);

// 静态资源
app.use(
  global.appConfig.staticPath,
  express.static(path.resolve(global.appDir, "./source"), {
    lastModified: false,
    etag: false,
    maxAge: 0
  })
);
// mock数据
// app.use('/mock', express.static(path.resolve(global.appDir, './mock')))
app.use("/mock", function(req, res) {
  let reqUrl = decodeURI(
    url.parse(req.originalUrl).pathname.replace(/^\//, "")
  );
  let filePath = path.resolve(global.appDir, reqUrl);

  if (req.query.callback) {
    res.jsonp(require(filePath));
  } else {
    res.json(require(filePath));
  }
});

app.use("/", function(req, res, next) {
  let reqPath = decodeURI(
    url.parse(req.originalUrl).pathname.replace(/^\//, "")
  );
  let pubPath = path.resolve(global.appDir, "./source/router/router-test.html");
  // vue router history  永远返回一个默认文件
  if (/\.html/.test(reqPath)) {
    res.sendFile(pubPath);
  }

  // let filePath = path.resolve(global.appDir, reqPath);
  // console.log("reqPath", reqPath);
  // console.log("filePath", filePath);
});

app.listen(global.appConfig.port, function() {
  console.log("服务已启动port ：", global.appConfig.port);
});
