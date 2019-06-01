App({
  globalData: {
    nickname: null,
    avatarUrl: null
  },
  onLaunch() {
    console.log("onLaunch监听小程序初始化");
    // wx.getSystemInfo({
    //   success: res => {
    //     console.log(res);
    //     let width = res.windowWidth;
    //     let scale = width / 375;
    //     console.log(scale);
    //   }
    // });
  },

  onShow() {
    console.log("onShow监听小程序显示");
  },

  onHide() {
    console.log("onLaunch监听小程序隐藏");
  }
});
