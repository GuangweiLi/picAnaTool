import axios from 'axios';
import qs from 'querystring'
import config from '../config'
let accessToken = '';

(async function() {
  const resp = await axios.get(`https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${config.client_id}&client_secret=${config.client_secret}`);
  accessToken = resp.data.access_token;
})();

export async function getText (file) {
  const params = {
    image: file
  }
  const r = await axios({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'post',
    url: `https://aip.baidubce.com/rest/2.0/ocr/v1/accurate?access_token=${accessToken}`,
    data: qs.stringify(params)
  })
  return r.data
}