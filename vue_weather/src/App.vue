<template>
  <div class="box">
    <div class="bg">
        <div class="seachbox">
          <label class="city">{{city}}</label>
          <el-input
            placeholder="请输入城市名称"
            v-model="input">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <button type="button" @click="seach">查询</button>
        </div>
        <!-- <div class="leftjiantou"></div> -->
        <!-- <span class="iconfont icon-zuojiantou" style="color: aliceblue;"></span> -->
        <!-- 天气内容 -->
        <h1 class="wendu">{{wendu}}<span style="font-size: 1.5rem;">℃</span></h1>
        <div class="tqms">
          <h4 class="weather">{{weather}}</h4>
          <span>|</span>
          <h4 class="windy">{{windy}}</h4>
        </div>
        <!-- 天气情况说明 -->
        <p class="description">{{description}}</p>
        <!-- <WeatherNowVue
        :weatherList = 'weatherList'
        ></WeatherNowVue> -->
        <div id="container" style="height: 15rem" ref="container"></div>

        <!-- 未来几天天气预报 -->
        <!-- <div class="fuetrue" style="height: 10rem;"> -->
        <!-- </div> -->

        <div class="fuetrue">
          <ul>
            <li class="weather_list">
              <div>今天</div>
              <div>
                <img
                  src="./image/weatherIcons/100.svg"
                  alt=""
                  width="18rem"
                  height="18rem"
                />
              </div>
              <div>晴</div>
              <div>14~23℃</div>
            </li>
            <li class="weather_list">
              <div>今天</div>
              <div>
                <img
                  src="./image/weatherIcons/100.svg"
                  alt=""
                  width="18rem"
                  height="18rem"
                />
              </div>
              <div>晴</div>
              <div>14~23℃</div>
            </li>
            <li class="weather_list">
              <div>今天</div>
              <div>
                <img
                  src="./image/weatherIcons/100.svg"
                  alt=""
                  width="18rem"
                  height="18rem"
                />
              </div>
              <div>晴</div>
              <div>14~23℃</div>
            </li>
            <li class="weather_list">
              <div>今天</div>
              <div>
                <img
                  src="./image/weatherIcons/100.svg"
                  alt=""
                  width="18rem"
                  height="18rem"
                />
              </div>
              <div>晴</div>
              <div>14~23℃</div>
            </li>
            <li class="weather_list">
              <div>今天</div>
              <div>
                <img
                  src="./image/weatherIcons/100.svg"
                  alt=""
                  width="18rem"
                  height="18rem"
                />
              </div>
              <div>晴</div>
              <div>14~23℃</div>
            </li>
            <li class="weather_list">
              <div>今天</div>
              <div>
                <img
                  src="./image/weatherIcons/100.svg"
                  alt=""
                  width="18rem"
                  height="18rem"
                />
              </div>
              <div>晴</div>
              <div>14~23℃</div>
            </li>
            <li class="weather_list">
              <div>今天</div>
              <div>
                <img
                  src="./image/weatherIcons/100.svg"
                  alt=""
                  width="18rem"
                  height="18rem"
                />
              </div>
              <div>晴</div>
              <div>14~23℃</div>
            </li>
            <li class="weather_list">
              <div>今天</div>
              <div>
                <img
                  src="./image/weatherIcons/100.svg"
                  alt=""
                  width="18rem"
                  height="18rem"
                />
              </div>
              <div>晴</div>
              <div>14~23℃</div>
            </li>
          </ul>
        </div>
        
    </div>
  </div>
</template>

<script>
// import {getCityId, getWeatherList} from '@/api/index'
import axios from 'axios';

const option = {
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  },
  yAxis: {
    type: "value",
    max: "50",
    min: "-10"
  },
  grid: {
    top: "2%",
    left: "2%",
    right: "2%",
    bottom: "10%",
    containLabel: true
  },
  series: [
    {
      name: "high",
      data: [15, 20, 24, 21, 15, 17, 26],
      type: "line"
    },
    {
      name: "low",
      data: [9, 9, 9, 9, 9, 9, 9],
      type: "line"
    }
  ]
};

export default {
  name: "App", 
  data() { 
    return {
      myChart: {},
      city: '南昌',
      cityId:'',
      wendu: '23',
      weather: '晴',
      windy: '北风4~5级',
      high: '20',
      low: '14',
      description: '南昌今天：天气晴，14~20度，北风4~5级。',
      input:'',
      // key:'787f3f931d0c462e86d189aab70510a1'
    }
  },
  // comments:{
  //   WeatherNowVue
  // },
  mounted() {
    this.myChart = this.$echarts.init(this.$refs.container)
    this.myChart.setOption(option)
    window.addEventListener('resize', () => {
      this.myChart.resize()
    })
  },
  methods:{
    getId(c){
      /*console.log(city)
      getWeatherInfo({
        address:'北京市朝阳区阜通东大街6号',
        city
      })
      axios.get(`http://wthrcdn.etouch.cn/weather_mini?city=${this.city}`)
      axios.get(`http://wthrcdn.etouch.cn/weather_mini?key=4a094553258dbecfe35022033c9bf72a&&address='北京市朝阳区阜通东大街6号'&&city=${this.city}`)
      axios.get(`https://devapi.qweather.com/v7/weather/now?location='北京'&key=${this.key}`)
      .then(res => {
        console.log(res);
        resdata = res.data.data;
        console.log(resdata)
        this.wendu = resdata.wendu;
        this.weather = resdata.forecast[0].type;
        this.windy = resdata.forecast[0].fengxiang;
        this.description = resdata.ganmao
      })
      .catch(err => console.log(err)) */
      axios.get(`https://geoapi.qweather.com/v2/city/lookup`,{
        params: {
          key: '787f3f931d0c462e86d189aab70510a1',
          location: c
        },
        headers: {}
      })
      .then(res=>{
        console.log(res)
        this.cityId = res.data.location[0].id
        this.city = res.data.location[0].name
        console.log(res.data.location[0].id)
        this.getWeatherInfo(res.data.location[0].id)
      })
      .catch(
        err => {
          console.log(err)
      }
      )
    },
    getWeatherInfo(id){
      console.log('已收到ID：'+id+'正在查询天气')
      axios.get('https://devapi.qweather.com/v7/weather/now',{
        params:{
          key: '787f3f931d0c462e86d189aab70510a1',
          location: id
        },
        headers:{}
      }).then(res=>{
        console.log('通过id查询到天气信息')
        console.log(res)
        this.wendu = res.data.now.temp
        this.weather = res.data.now.text
        this.windy = res.data.now.windDir + res.data.now.windScale + '级'
      }).catch(err => console.log(err))
    },
    seach(){
      const a = this.input
      // console.log(a)
      // this.city = a,
      console.log(a)
      this.getId(a)
      // console.log('拿到cityID：'+this.cityId+'准备查询天气。')
      // this.getWeatherInfo(this.cityId)
    }
  },
  // created(){
  //   this.getHandle()
  // }
};
</script>

<style> 

</style>
