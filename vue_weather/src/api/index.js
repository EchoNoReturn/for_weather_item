import request from "../utils/request";
import requestId from "../utils/requestId";


const key = '787f3f931d0c462e86d189aab70510a1'

// 请求城市ID
export function getCityId(city){
  params = {
    key,
    location: city,
    range: 'cn'
  }
  return requestId({
    method: 'GET',
    url: '/v2/city/lookup',
    params
  })
}

// 根据城市ID，查询城市天气
export function getWeatherList (location){
  params = {
    key,
    location
  }
  return request({
    method: 'GET',
    url: '/v7/weather/now',
    params
  })
}

