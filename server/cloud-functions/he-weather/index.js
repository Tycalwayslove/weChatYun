const API_URL = "https://free-api.heweather.net/s6/weather";
const request = require("request");

/*<jdists import="../../inline/utils.js" />*/

/*<remove>*/
const $ = require("../../inline/utils");
/*</remove>*/

exports.main = async event => {
  const { lat, lon } = event;
  let location = `${lat},${lon}`;
  let params = {
    location,
    key: "49d26eb32dea4e98ad4ff5fd9cd2e5df" //和风天气中应用的密钥
  };
  let query = [];
  for (let i in params) {
    query.push(`${i}=${encodeURIComponent(params[i])}`);
  }
  // console.log(query);
};
