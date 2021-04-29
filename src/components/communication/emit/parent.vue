<template>
  <div class="list">
    <div class="title">父组件</div>
    <div class="item">
      <div>a: {{ parent }}</div>
      <div>b: {{ parentB }}</div>
      <div>inject: {{ provideObj }}</div>

      <div v-for="(item, index) in list.arr" :key="index">
        <div>数组元素{{ index + 1 }} : {{ item.a }}</div>
      </div>
      <button @click="click">修改值父组件</button>
      <child :a="a" :list="list"></child>
    </div>
  </div>
</template>

<script>
import child from "./child.vue";

export default {
  data() {
    return {
      parent: this.a,
      parentList: this.list,
      parentB: this.b
    };
  },
  inject: ["provideObj"],
  props: {
    a: {},
    b: {
      type: Number
    },
    list: {
      default: {}
    }
  },
  components: {
    child
  },
  methods: {
    click() {
      this.parentB--;
      this.$emit("update:b", this.parentB);
      this.parent.b.c--;
      this.parentList.arr[0].a--;
      this.provideObj.obj.a++;
    }
  },
  watch: {
    a: {
      deep: true,
      handler: function(newVal, oldVal) {
        console.log(newVal);
      }
    }
  }
};
</script>
<style scoped></style>
