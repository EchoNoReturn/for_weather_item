import axios from "axios";

const requestId = axios.create({
  baseURL: 'https://geoapi.qweather.com',
  timeout:5000
})

export default requestId