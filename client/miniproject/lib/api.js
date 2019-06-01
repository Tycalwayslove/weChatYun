wx.cloud.init({
  env: "demo-yun"
});

const db = wx.cloud.database();
console.log(api);

// 测试云函数
export const test = (a, b) => {
  return wx.cloud.callFunction({
    name: "test",
    data: { a, b }
  });
};
