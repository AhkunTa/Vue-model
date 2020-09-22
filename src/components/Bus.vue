<template>
  <div>
    <div style="margin: 100px">Bus</div>
    <BusChild1 style="margin: 20px"></BusChild1>
    <BusChild2 style="margin: 20px"></BusChild2>
  </div>
</template>

<script>
import Bus from "@utils/bus.js";

import BusChild1 from "@components/BusChild1.vue"
import BusChild2 from "@components/BusChild2.vue"

export default {
  data() {
    return {};
  },
  mounted() {
    console.log(Bus)
    Bus.$on("click2", value => {
      console.log('bus',value);
      console.log(Bus.$emit)
    });
    
  },
  components: {
    BusChild1,
    BusChild2
  }
};
</script>
<style scoped>
</style>
