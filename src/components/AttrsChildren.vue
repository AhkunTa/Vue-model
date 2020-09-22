<template>
  <div>
    <div>child1 {{title}}</div>
    <div>{{$attrs}}</div>
    <div>{{$listeners}}</div>
    <AttrsChildren2 v-bind="$attrs" v-on="$listeners"></AttrsChildren2>
  </div>
</template>

<script>
import AttrsChildren2 from "@components/AttrsChildren2.vue";

export default {
  data() {
    return {};
  },
  props: {
    title: String
  },
  inheritAttrs: false,
  components: {
    AttrsChildren2
  },
  created(){
    console.log(this.$listeners)
  }

};
</script>
<style scoped>
</style>
