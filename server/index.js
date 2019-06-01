const path = require("path");
const express = require("express");

const { PORT } = require("../config.server.json"); //接口配置
const decrypt = require("./cloud-functions/decrypt/").main;

const app = express();
// 实现静态资源服务 //此处无法自动更新，后续改
app.use("/static", express.static(path.join(__dirname, "static")));

// 测试中间件接口
const test = require("./cloud-functions/test/").main;

app.get("/api/test", (req, res, next) => {
  test(req.query)
    .then(res.json.bind(res))
    .catch(e => {
      console.error(e);
      next(e);
    });
});
// 和风天气接口
const heWeather = require("./cloud-functions/he-weather/").main;
app.get("/api/he-weather", (req, res, next) => {
  heWeather(req.query)
    .then(res.json.bind(res))
    .catch(e => {
      // console.error(e);
      console.error("fail is over");
      next(e);
    });
});
// 监听
app.listen(PORT, () => {
  console.log(`开发服务器启动成功：http://127.0.0.1:${PORT}`);
});
