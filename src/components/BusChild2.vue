<template>
  <div>
    <div @click="click2">BusChild2</div>
  </div>
</template>

<script>
import Bus from "@utils/bus.js";

export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {
    click2() {
      Bus.$emit("click2", "click2");
    }
  },
  mounted() {
    Bus.$on("click1", value => {
      console.log('buschild2',value);
    });
  }
};
</script>
<style scoped>
</style>
