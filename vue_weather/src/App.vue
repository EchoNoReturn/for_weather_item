<template>
  <div class="box">
    <div class="bg">
      <!-- 查询部分 -->
      <div class="seachbox">
        <el-input
          placeholder="请输入城市名称"
          v-model="input"
          clearable
          @change="handleSearch()"
        >
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>
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
      <!-- 天气情况说明,后面还可以添加各种指数建议 -->
      <p class="description">{{ description }}</p>
      
        <!-- echarts图表 -->
      <div id="container" style="height: 12rem" ref="container"></div>

      <div class="fuetrue">
        <ul>
          <li v-for="(item, i) in weatherList" :key="i" class="weather_list">
            <div>{{ item.date }}</div>
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
import { getCityId, getWList, getWTimeInfo, getWWeekInfo } from '@/api/index'
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
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue']
        },
        yAxis: {
          type: 'value'
        },
        grid: {
          top: '15%',
          left: '2%',
          right: '3%',
          bottom: '20%',
          // containLabel: true
        },
        series: [
          {
            data: [15, 23, 22, 21, 13, 14, 26],
            type: 'line',
            symbolSize: 10,
            label: {
              show: true,
              position: 'top'
            }
          }
        ]
      }
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
      getCityId(city)
        .then(res => {
          // console.log(">>>>res", res);
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
      getWTimeInfo(id)
        .then(res => {
          console.log("时", res);
          const hourly = res.data.hourly;
          const temp = hourly.map(item => Number(item.temp));
          const fxTime = hourly.map(item => item.fxTime.slice(11,16));
          this.option.series[0].data = temp;
          // this.option.xAxis.data = fxTime;
          for (let i in this.option.xAxis.data) 
          { // 控制显示的数据量不超过原本数组的长度
            this.option.xAxis.data[i] = fxTime[i]
          }
          console.log("this.option.xAxis.data",this.option.xAxis.data)
          console.log('this.option.series.data',this.option.series.data);
          console.log('this.option',this.option);
          this.$nextTick(() => {
            this.renderEcharts()
          })
        })
        .catch(err => console.log(err));
    },
    // 日：天气信息
    getWeatherDayInfo(id) {
      getWList(id)
        .then(res => {
          console.log("日", res);
          const daily = res.data.now
          this.wendu = daily.temp
          this.weatherIcon = daily.icon
          this.weather = daily.text
          this.windy = daily.windDir + daily.windScale + '级'
          this.description = this.city + '今天：' + this.weather + this.wendu + "℃，" + this.windy + '。'
        })
        .catch(err => console.log(err));
    },
    // 周：天气信息
    getWeatherWeekInfo(id) {
      getWWeekInfo(id)
        .then(res => {
          // console.log("周", res);
          // 七天数据
          let dList = res.data.daily 
          for (let i in dList) {
            this.weatherList[i].date = dList[i].fxDate.slice(8,)+"日"
            this.weatherList[i].weather = dList[i].textDay
            this.weatherList[i].icon = dList[i].iconDay
            this.weatherList[i].tem = dList[i].tempMax + "~" + dList[i].tempMin + "°"
          }
        })
        .catch(err => console.log(err));
    },
    handleSearch() {
      this.getCityIdByName(this.input);
    },
    renderEcharts () {
      // console.log('12');
      this.myChart.setOption(this.option);
    }
  },
  created(){
    this.getCityIdByName(this.city)
  }
};
</script>

<style></style>