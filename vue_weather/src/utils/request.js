import axios from "axios";

const request = axios.create({
  // baseURL: 'http://wthrcdn.etouch.cn',
  // 高德地图接口
  baseURL: 'https://restapi.amap.com/v3',
  timeout: 5000
})

export default request