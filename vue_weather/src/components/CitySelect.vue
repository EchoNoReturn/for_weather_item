<template>
  <div>
    <!-- 选择省份时：更新市、区数据 -->
    <select
      v-model="province"
      @change="
        updateCity()
        updateDistrict()
        pushData()
      "
    >
      <option v-for="(item, index) in list" :key="index">{{ item.name }}</option>
    </select>
    <select
      v-model="city"
      @change="
        updateDistrict()
        pushData()
      "
    >
      <option v-for="(item, index) in cityList" :key="index">{{ item.name }}</option>
    </select>
    <select v-model="district" @change="pushData">
      <option v-for="(item, index) in DistrictList" :key="index">{{ item.name }}</option>
    </select>
  </div>
</template>

<script>
</script>