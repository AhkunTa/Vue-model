<template>
  <div>
    <div class="list">
      <div class="item">
        <div class="title">计算属性传参</div>
        <div>computed数据: {{ funcComp1(a, b, c) }}</div>
        <div>math数据: {{ funcMath1(a, b, c) }}</div>
      </div>
      <div class="item">
        <div class="title">计算属性和method区别</div>
        <div>computed数据: {{ funcComp2 }}</div>
        <div>math数据: {{ funcMath2(a, b, c) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      a: 1,
      b: 2,
      c: 3
    };
  },
  created() {},
  computed: {
    // 计算属性传参
    // 利用闭包
    funcComp1() {
      return function(a, b, c) {
        return a + b + c;
      };
    },
    funcComp2: {
      get: function() {
        return this.a + this.b + this.c;
      },
      set: function() {}
    }
  },
  methods: {
    funcMath1(a, b, c) {
      return (function(a, b, c) {
        return a + b + c;
      })(a, b, c);
      // return this.a + this.b + this.c;
    },
    funcMath2() {
      return this.a + this.b + this.c;
    }
  }
};
</script>
<style scoped>
.list {
  padding: 10px;
  border: 1px solid #e8e8e8;
}
.title {
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  padding: 5px 0;
}
.item {
  margin-top: 10px;
  background: #f0f0f0;
}
</style>
