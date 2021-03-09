<template>
  <div>
    <div class="item">
      <div class="title">provide</div>
      <div class="content">
        <div>observable1：{{ provideTest.testData }}</div>
        <div>observable2 非引用对象：{{ provideTest2 }}</div>
        <div>provide 3:{{ testData3 }}</div>

        <div>引入observable.js: name {{ name }}</div>
        <div>引入observable.js: age {{ age }}</div>

        <div class="btn" @click="click">修改子组件数据 inject</div>
      </div>
    </div>
    <Inject />
  </div>
</template>

<script>
import { store, mutations } from "@store/modules/observable.js";
import Inject from "@components/Inject.vue";
// console state = Vue.observable({provideTest: '111'})
import Vue from "vue";
export default {
  data() {
    return {
      testData2: 1,
      testData: {
        testData: 10
      },
      testData3: {
        testData: 100
      },
      testData4: {
        testData: 1000
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

  /* //可响应对象必须为obj等引用类型，基础数据类型无法响应
  provide() {
    return {
      provideTest: this.testData2
    };
  }, */

  // 方法2 vue 2.6 新提供的 observable
  provide() {
    this.provideTest = Vue.observable(this.testData);
    this.provideTest2 = Vue.observable(this.testData2);
    return {
      provideTest: this.provideTest,
      // provideTest2 子组件更新provideTest2 父组件将不会响应
      provideTest2: this.provideTest2,
      provideTest3: this.testData3
    };
  },
  // 方法3 使用observable

  methods: {
    click() {
      this.provideTest.testData = 10;
      this.testData3.testData = 100;
      this.provideTest2 = 1;

      mutations.changeName("张三");
      mutations.addAge(1);
    }
  },
  computed: {
    name() {
      return store.name;
    },
    age() {
      return store.age;
    }
  },
  created() {},
  mounted() {
    console.log(store);
  }
};
</script>
<style scoped></style>
