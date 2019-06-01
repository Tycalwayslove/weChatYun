const path = require("path");
const crypto = require("crypto");

const WECHAT_APPID = "wxd518e14f9fdceacc";
const WECHAT_APP_SECRET = "4431e1b4e79bde3732a6b1b081679045";
const $ = {
  getWechatAppConfig: () => {
    return {
      id: WECHAT_APPID,
      sk: WECHAT_APP_SECRET
    };
  }
};

/*<remove>*/
module.exports = $;
/*</remove>*/
