<template>
  <div>
    <p class="city">{{weatherList.city}}</p>
    <!-- <div class="leftjiantou"></div> -->
    <!-- <span class="iconfont icon-zuojiantou" style="color: aliceblue;"></span> -->
    <!-- 天气内容 -->
    <h1 class="wendu">{{weatherList.wendu}}<span style="font-size: 1.5rem;">℃</span></h1>
    <div class="tqms">
      <h4 class="weather">{{weatherList.weather}}</h4>
      <span>|</span>
      <h4 class="windy">{{weatherList.windy}}</h4>
    </div>
    <!-- 天气情况说明 -->
    <p class="description">{{weatherList.description}}</p>
  </div>
</template>

<script>
export default {
  props:{
    weatherList: {
      city: '南昌',
      wendu: '23',
      weather: '晴',
      windy: '北风4~5级',
      high: '20',
      low: '14',
      description: '南昌今天：天气晴，14~20度，北风4~5级。'
    }
  }
}
</script>

<style>

</style>