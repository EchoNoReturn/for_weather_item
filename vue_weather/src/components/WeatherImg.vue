<template> 
  <img :src="require(`@/image/weatherIcons/${url}.svg`)"/>
</template> 
<script> 
export default {
    name: "Img",
    props: { 
        url: {},
    }
};
</script>

<style>

</style>