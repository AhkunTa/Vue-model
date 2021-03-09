<template>
  <div class="label">
    <div class="title">inject</div>
    <div class="item">{{ provideTest2 }}</div>
    <div class="item">{{ provideTest.testData }}</div>
    <div class="item">{{ provideTest3.testData }}</div>
  </div>
</template>

<script>
import { store, mutations } from "@store/modules/observable.js";

export default {
  // inject: ["provideTest", "provideTest2", "provideTest3"],
  inject: {
    provideTest: {
      testData: {
        default: "默认数据"
      }
    },
    provideTest2: {},
    provideTest3: {
      default: "默认数据"
    }
  },
  data() {
    return {
      // 同props一样 子组件接收 provide
      // 当为 基础数据类型时 直接修改 会导致警告
      injectTest2: this.provideTest2,
      injectTest: this.provideTest
    };
  },
  mounted() {
    setInterval(() => {
      this.injectTest.testData += 1;
      // this.injectTest2 += "2";
      this.provideTest3.testData += 3;
      mutations.changeName("张三");
      mutations.addAge(1);
    }, 3000);
  }
};
</script>
<style scoped></style>
