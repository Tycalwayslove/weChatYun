import Promise from "./blubird";
import { PORT } from "../../config.server.json";

wx.cloud.init({
  env: "demo-yun"
});
console.log(api - mock);
const db = wx.cloud.database();
export const test = (a, b) => {
  return new Promise((reslove, reject) => {
    wx.request({
      url: `http://127.0.0.1:${PORT}/api/test`,
      data: { a, b },
      success: res => {
        reslove({ result: res.data });
      },
      fail: e => {
        reject(e);
      }
    });
  });
};
