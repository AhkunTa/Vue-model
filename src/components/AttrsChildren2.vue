<template>
  <div class="item">
    <div class="title">child2</div>
    <div @click="$emit('test', 'listenertest')">children 2 {{ $attrs }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    foo: String
  },
  components: {},
  created() {
    this.$attrs.bar = "bar ohhh!";
  },
  watch: {
    $attrs(newVal, oldVal) {
      console.log(newVal);
    }
  }
};
</script>
<style scoped></style>
