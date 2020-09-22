<template>
  <div>
    <div>provide</div>
    <div>{{testData}}</div>
    <div @click="click">click</div>
    <Inject />
  </div>
</template>

<script>
import Inject from "@components/Inject.vue";
// console state = Vue.observable({provideTest: '111'})
import Vue from "vue";
export default {
  data() {
    return {
      testData: "222",
      testData2: {
        testData: '444'
      }
    };
  },
  components: {
    Inject
  },

  /* //方法一 返回祖先实例 或可响应对象
  provide(){
    return {
      provideTest: this
    }
  }, */

  /* //可响应对象必须为obj
  provide() {
    return {
      provideTest: this.testData2
    };
  }, */

  // 方法2 vue 2.6 新提供的 observable
  provide() {
    this.provideTest = Vue.observable({ testData: '222'})
    return {
      provideTest: this.provideTest
    };
  },
  methods: {
    click() {
      console.log(this)
      // this.testData2.testData = '333';
      // this.testData = "333";
      this.provideTest.testData = '333';
    }
  },
  created(){
  }
};
</script>
<style scoped>
</style>
