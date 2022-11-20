<template>
  <div id="app">
    <div class="box">
      <div class="bg">
        <p class="city">{{city}}</p>
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
        <div id="container" style="height: 15rem" ref="container"></div>

        <!-- 未来几天天气预报 -->
        <!-- <div class="fuetrue" style="height: 10rem;"> -->
        <!-- </div> -->

        <div class="fuetrue">
          <!--这里放置真实显示的DOM内容-->
          <ul>
            <li class="weather_list">
              <div>今天</div>
              <div>
                <img
                  src="./image/tqyb_icon.png"
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
                  src="./image/tqyb_icon.png"
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
                  src="./image/tqyb_icon.png"
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
                  src="./image/tqyb_icon.png"
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
                  src="./image/tqyb_icon.png"
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
                  src="./image/tqyb_icon.png"
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
                  src="./image/tqyb_icon.png"
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
                  src="./image/tqyb_icon.png"
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
        <!-- 出行推荐 -->
        <!-- <div class="search">
          <input type="text" id="search_txt" value="北京" />
          <button type="button">查询</button>
        </div> -->
        
      </div>
      <div class="seachbox">
        <input type="text" id="search_txt" value='北京'/>
        <button type="button" @click="seach">查询</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

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

let resdata = {}

export default {
  name: "App", 
  data() { 
    return {
      myChart: {},
      city: '南昌',
      wendu: '23',
      weather: '晴',
      windy: '北风4~5级',
      high: '20',
      low: '14',
      description: '南昌今天：天气晴，14~20度，北风4~5级。'
    }
  },
  mounted() {
    this.myChart = this.$echarts.init(this.$refs.container)
    this.myChart.setOption(option)
    window.addEventListener('resize', () => {
      this.myChart.resize()
    })
  },
  methods:{
    getHandle(){
      axios.get(`http://wthrcdn.etouch.cn/weather_mini?city=${this.city}`)
      .then(res => {
        console.log(res);
        resdata = res.data.data;
        this.wendu = resdata.wendu;
        this.weather = resdata.forecast[0].type;
        this.windy = resdata.forecast[0].fengxiang;
        this.description = resdata.ganmao
      })
      .catch(err => console.log(err))
    },
    seach(){
      const a = document.querySelector('#search_txt').value
      // console.log(a)
      this.city = a,
      console.log(this.city)
      this.getHandle()
    }
  },
  // created(){
  //   this.getHandle()
  // }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

p {
  font-family: "Courier New", Courier, monospace;
  font-size: 1rem;
  color: #fff;
}

/* 以上为通用样式 */

/* 大底 */
.box {
  position: absolute;
  width: 100%;
  height: auto;
  /* background-color: aquamarine; */
  margin-top: 0%;
}

/* 天气背景 */
.box > .bg {
  width: 95%;
  height: auto;
  background-image: linear-gradient(
    #9496e0,
    #3cc1e5
  );
  border: solid 0px;
  padding-bottom: 7rem;
  border-radius: 1rem;
  margin: 5px auto;
  position: relative;
  /* box-shadow: 8px 6px rgb(75, 75, 75, 0.5); */
  backdrop-filter: blur(5px);
  position: relative;
}

/* 头部 */
.city {
  height: 40px;
  width: auto;
  font-size: 1.25rem;
  color: aliceblue;
  display: flex;
  justify-content: flex-start;
  position: absolute;
  top: 1.25rem;
  left: 1.25rem;
}

.city::after {
  content: "";
  width: 0;
  height: 0;
  border-right: 7px solid transparent;
  border-top: 7px solid #ebebeb;
  border-left: 7px solid transparent;
  margin: 0.4rem 0.15rem;
}

/* 天气详情 */
.bg > .wendu {
  color: aliceblue;
  font: icon;
  font-size: 3rem;
  font-weight: 100;
  width: 100%;
  padding: 6rem 0 2rem;
  text-align: center;
  position: relative;
}

.bg > .wendu > span {
  position: absolute;
  top: 6rem;
}

.tqms {
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
}

.tqms > h4,
.tqms > span {
  color: aliceblue;
  margin: 0 0.1rem;
  font-size: 1.1rem;
  font-family: Arial, Helvetica, sans-serif;
  display: inline-block;
}

.description {
  padding: 10px;
  /* width: 70%; */
  height: 1rem;
  line-height: 1.5rem;
  font-size: 1rem;
  margin: 10px 0;
  /* overflow: hidden; */
  /* display: inline-block; */
}

.fuetrue {
  width: auto;
  height: 84px;
  float: left;
  justify-content: center;
  scroll-behavior: smooth;
}

.fuetrue > ul {
  flex-shrink: 0;
  position: absolute;
  overflow: auto;
  max-width: 100%;
  display: inline-flex;
}

.weather_list {
  width: 6.25rem;
  list-style: none;
  color: aliceblue;
  font-size: 1rem;
  text-align: center;
  display: inline-block;
  margin: 0 4px;
}

.box>.seachbox{
  width: 100%;
  height: 4rem;
  display: flex;
  justify-content: center;
}
.box>.seachbox>#search_txt{
  width: 75%;
  height: var(100%-2);
  border-color: #fff;
  border-color: #3cc1e5;
  border-bottom-left-radius: 1rem;
  border-top-left-radius: 1rem;
  /* box-shadow: 8px 6px rgb(75, 75, 75, 0.5); */
}
.box>.seachbox>button{
  width: 20%;
  height: 100%;
  margin: 0%;
  background-color: #3cc1e5;
  border: #3cc1e5 3px;
  border-bottom-right-radius: 1rem;
  border-top-right-radius: 1rem;
  /* box-shadow: 8px 6px rgb(75, 75, 75, 0.5); */
}
</style>
