<template>
  <div>
    <div @click="click1">BusChild1</div>
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
    click1() {
      Bus.$emit("click1", "click1");
    }
  },
  mounted() {
    Bus.$on("click2", value => {
      console.log('buschild1',value);
    });
  }
};
</script>
<style scoped>
</style>
