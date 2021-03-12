<template>
  <div class="list">
    <div class="item">
      <div class="title">child1</div>
      <div>title: {{ title }}</div>
      <div>attrs属性：{{ $attrs }}</div>
      <div>listeners监听事件： {{ $listeners }}</div>
      <div class="btn" @click="$emit('test', '测试')">click事件</div>
      <AttrsChildren2 v-bind="$attrs" v-on="$listeners"></AttrsChildren2>
    </div>
  </div>
</template>

<script>
import AttrsChildren2 from "@components/AttrsChildren2.vue";

export default {
  data() {
    return {};
  },
  props: {
    // 所有父组件传递的未被props申明的变量都会在 子组件的$attrs中
    // 所有监听事件 都在 $listeners中
    title: String
  },
  inheritAttrs: false,
  components: {
    AttrsChildren2
  },
  created() {
    console.log(this.$listeners, this.$attrs);
  }
};
</script>
<style scoped></style>
