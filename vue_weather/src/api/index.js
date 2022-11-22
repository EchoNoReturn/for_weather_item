import request from "../utils/request";
import requestId from "../utils/requestId";

/**
 * 本文档内的接口必须传递两个参数：
 * key：用户认证key，支持数字签名方式进行认证。例如 key=123456789ABC
 * location: 需要查询地区的LocationID或以英文逗号分隔的经度,纬度坐标（十进制，最多支持小数点后两位）
 *  */

const key = '787f3f931d0c462e86d189aab70510a1'

// 根据城市名称，查找城市ID
export function getCityId(location){
  return requestId({
    method: 'GET',
    url: '/v2/city/lookup',
    params:{
      key,
      location 
      /*
      *唯一一个location，可以传递的是城市名称，支持模糊查找
      *需要查询地区的名称，支持文字、以英文逗号分隔的经度,纬度坐标（十进制，最多支持小数点后两位）、
      *LocationID或Adcode（仅限中国城市）。例如 location=北京 或 location=116.41,39.92*/
    },
    headers: {}
  })
}

// 根据城市ID，查询城市天气
export function getWeatherList (location){
  return request({
    method: 'GET',
    url: '/v7/weather/now',
    params: {
      key,
      location
    }
  })
}

// 根据城市ID，获取24小时天气
export function getHouseweather(location){
  return request({
    method: 'GET',
    url: '/v7/weather/24h',
    params:{
      key,
      location 
    },
    headers:{}
  })
}