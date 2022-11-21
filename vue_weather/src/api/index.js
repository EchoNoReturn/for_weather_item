import request from "../utils/request";

// 高德地图Load
import AMapLoader from '@amap/amap-jsapi-loader';

export function getAdcode(address,city){
  const params = {
    key:'4a094553258dbecfe35022033c9bf72a',
    address,
    city
  }
  AMapLoader.load({
    key: "4a094553258dbecfe35022033c9bf72a",              // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "1.4.15",   // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    // "plugins": [],           // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  }).then((AMap)=>{
    map = new AMap.Map('container');
  }).catch(e => {
    console.log(e);
  })
  return request({
    method: 'GET',
    url: 'geocode/geo',
    params
  })
}

export function getWeatherInfo (params){
  return request({
    method: 'GET',
    url: '/weather_mini',
    params
  })
}

