const path = require("path");
const express = require("express");

const { PORT } = require("../config.server.json"); //接口配置
const decrypt = require("./cloud-functions/decrypt/").main;

const app = express();
// 实现静态资源服务
app.use(
  "/static",
  express.static(path.join(__dirname, "static"), {
    index: false,
    maxage: "30d"
  })
);

// 测试中间件接口
app.get("/api/test", (req, res, next) => {
  decrypt;
});
// 监听
app.listen(PORT, () => {
  console.log(`开发服务器启动成功：http://127.0.0.1:${PORT}`);
});
