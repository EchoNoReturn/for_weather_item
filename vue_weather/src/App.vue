<template>
  <div class="box">
    <div class="bg">
      <div class="seachbox">
        <!-- <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select> -->
        <el-input
          placeholder="请输入城市名称"
          v-model="input"
          clearable
          @change="handleSearch()"
        >
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>
      <!-- <div class="leftjiantou"></div> -->
      <!-- <span class="iconfont icon-zuojiantou" style="color: aliceblue;"></span> -->
      <!-- 天气内容 -->
      <h3>{{city}}</h3>
      <weather-img 
        :url="weatherIcon"
        class="weather_icon"
        alt="Weather"
        width="40rem"
        height="40rem"></weather-img>
      <h1 class="wendu">
        {{ wendu }}<span style="font-size: 1.5rem;">℃</span>
      </h1>
      <div class="tqms">
        <h4 class="weather">{{ weather }}</h4>
        <span>|</span>
        <h4 class="windy">{{ windy }}</h4>
      </div>
      <!-- 天气情况说明 -->
      <p class="description">{{ description }}</p>
      <!-- <WeatherNowVue
        :weatherList = 'weatherList'
        ></WeatherNowVue> -->
      <div id="container" style="height: 15rem" ref="container"></div>

      <!-- 未来几天天气预报 -->
      <!-- <div class="fuetrue" style="height: 10rem;"> -->
      <!-- </div> -->

      <div class="fuetrue">
        <ul>
          <li v-for="(item, i) in weatherList" :key="i" class="weather_list">
            <div>{{ item.date }}</div>
          
              <!-- <img
                src="./image/weatherIcons/100.svg"
                alt="Weather"
                width="18rem"
                height="18rem"
              /> -->
              <weather-img 
                :url="item.icon"
                alt="Weather"
                width="18rem"
                height="18rem"></weather-img>
            <div>{{ item.weather }}</div>
            <div>{{ item.tem }}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// import {getCityId, getWeatherList} from '@/api/index'
import axios from "axios";
import WeatherImag from "./components/WeatherImg.vue"
import WeatherImg from './components/WeatherImg.vue';

export default {
  components: { WeatherImg },
  name: "App",
  data() {
    return {
      myChart: {},
      city: "南昌",
      cityId: "",
      wendu: "23",
      weather: "晴",
      weatherIcon: "100",
      windy: "北风4~5级",
      high: "20",
      low: "14",
      description: "南昌今天：天气晴，14~20度，北风4~5级。",
      input: "",
      options: [
        {
          label: "北京",
          value: "北京"
        },
        {
          label: "南昌",
          value: "南昌"
        }
      ],
      weatherList: [
        {
          date: "今天",
          weather: "晴",
          icon: "100",
          tem: "14~23℃"
        },
        {
          date: "今天",
          weather: "晴",
          icon: "100",
          tem: "14~23℃"
        },
        {
          date: "今天",
          weather: "晴",
          icon: "100",
          tem: "14~23℃"
        },
        {
          date: "今天",
          weather: "晴",
          icon: "100",
          tem: "14~23℃"
        },
        {
          date: "今天",
          weather: "晴",
          icon: "100",
          tem: "14~23℃"
        },
        {
          date: "今天",
          weather: "晴",
          icon: "100",
          tem: "14~23℃"
        },
        {
          date: "今天",
          weather: "晴",
          icon: "100",
          tem: "14~23℃"
        }
      ],
      option: {
        xAxis: {
          type: "category",
          data: [15, 20, 24, 21, 15, 17, 26]
        },
        yAxis: {
          type: "value",
          max: "20",
          min: "0"
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
            data: [],
            type: "line"
          }
        ]
      }
      // key:'787f3f931d0c462e86d189aab70510a1'
    };
  },
  mounted() {
    this.myChart = this.$echarts.init(this.$refs.container);
    this.myChart.setOption(this.option);
    window.addEventListener("resize", () => {
      this.myChart.resize();
    });
  },
  comments:{
    WeatherImag
  },
  methods: {
    // 城市id
    getCityIdByName(city) {
      axios
        .get(`https://geoapi.qweather.com/v2/city/lookup`, {
          params: {
            key: "787f3f931d0c462e86d189aab70510a1",
            location: city
          },
          headers: {}
        })
        .then(res => {
          console.log(">>>>res", res);
          this.cityId = res.data.location[0].id;
          this.city = res.data.location[0].name;
          this.getWeatherTimeInfo(this.cityId);
          this.getWeatherDayInfo(this.cityId);
          this.getWeatherWeekInfo(this.cityId);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 时：天气信息 https://api.qweather.com/v7/weather/24h
    getWeatherTimeInfo(id) {
      console.log("已收到ID：" + id + "正在查询天气");
      axios
        .get("https://devapi.qweather.com/v7/weather/24h", {
          params: {
            key: "787f3f931d0c462e86d189aab70510a1",
            location: id
          },
          headers: {}
        })
        .then(res => {
          console.log("时", res);
          const hourly = res.data.hourly;
          const temp = hourly.map(item => Number(item.temp));
          const fxTime = hourly.map(item => item.fxTime.slice(11,16));
          this.option.series.data = temp;
          this.option.xAxis.data = fxTime;
          this.option.yAxis.max = Math.max(hourly); // 获取温度的最大值
          // this.option.yAxis.min = hourly.min; // 获取温度的最小值
          console.log('this.option.series.data',this.option.series.data);
          console.log('this.option',this.option);
          this.$nextTick(() => {
            this.renderEcharts()
          })
          // const min = daily.map(item => item.tempMin)
          // this.wendu = res.data.now.temp
          // this.weather = res.data.now.text
          // this.windy = res.data.now.windDir + res.data.now.windScale + '级'
        })
        .catch(err => console.log(err));
    },
    // 日：天气信息
    getWeatherDayInfo(id) {
      axios
        .get("https://devapi.qweather.com/v7/weather/now", {
          params: {
            key: "787f3f931d0c462e86d189aab70510a1",
            location: id
          },
          headers: {}
        })
        .then(res => {
          console.log("日", res);
          const daily = res.data.now

          // const max = daily.map(item => item.tempMax)
          // const min = daily.map(item => item.tempMin)
          this.wendu = daily.temp
          this.weatherIcon = daily.icon
          this.weather = daily.text
          this.windy = daily.windDir + daily.windScale + '级'
        })
        .catch(err => console.log(err));
    },
    // 周：天气信息
    getWeatherWeekInfo(id) {
      axios
        .get("https://devapi.qweather.com/v7/weather/7d", {
          params: {
            key: "787f3f931d0c462e86d189aab70510a1",
            location: id
          },
          headers: {}
        })
        .then(res => {
          console.log("周", res);
          // 七天数据
          let dList = res.data.daily 
          for (let i in dList) {
            this.weatherList[i].date = dList[i].fxDate.slice(8,)+"日"
            this.weatherList[i].weather = dList[i].textDay
            this.weatherList[i].icon = dList[i].iconDay
            this.weatherList[i].tem = dList[i].tempMax + "~" + dList[i].tempMin + "°"
            this.description = this.city + '今天：' + this.weather + this.wendu + "℃，" + this.windy + '。'
          }
          // tempMax
          // tempMin
          // this.wendu = res.data.now.temp;
          // this.weather = res.data.now.text;
          // this.windy = res.data.now.windDir + res.data.now.windScale + "级";
        })
        .catch(err => console.log(err));
    },
    handleSearch() {
      this.getCityIdByName(this.input);
    },
    renderEcharts () {
      console.log('12');
      this.myChart.setOption(this.option);
    }
  },
  // created(){
  //   this.getCityIdByName('南昌')
  // }
};
</script>

<style></style>