<template>
  <div class="list">
    <div class="title">子组件</div>
    <div class="item">
      <div>a: {{ child }}</div>
      <div>inject: {{ provideObj }}</div>
      <button @click="click">修改c属性</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      child: this.a
    };
  },
  inject: ["provideObj"],

  props: {
    a: {
      default: {}
    }
  },
  methods: {
    click() {
      this.child.b.c++;
      this.provideObj.obj.a--;
    }
  },
  components: {}
};
</script>
<style scoped></style>
