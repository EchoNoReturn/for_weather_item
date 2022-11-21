import axios from "axios";

const request = axios.create({
  // baseURL: 'http://wthrcdn.etouch.cn',
  // 高德地图接口
  // baseURL: 'https://restapi.amap.com/v3',
  // 和风天气api
  baseURL: 'https://devapi.qweather.com',
  timeout: 5000
})



export default request