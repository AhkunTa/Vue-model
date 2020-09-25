<template>
  <div>
    <div>Slot1</div>
    <slot v-bind:user="user1">111</slot>
    <slot name="slot1"></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user1: {
        foo: "foo",
        bar: "bar"
      }
    };
  },
  mounted() {},
  components: {}
};
</script>
<style scoped></style>
