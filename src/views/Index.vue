<template>
  <div class="index-page">
    <div class="list">
      <div class="label">
        <div class="title">组件通信方法</div>
        <div class="item-content">
          <router-link class="btn" to="/component-communicate">
            provide-inject
          </router-link>
        </div>
      </div>
      <div class="label">
        <div class="title">vuex-orm设置</div>
        <div class="item-content">
          <router-link class="btn" to="/vuex-orm">vuex-orm</router-link>
        </div>
      </div>
      <div class="label">
        <div class="title">vue基础用法</div>
        <div class="item-content">
          <router-link class="btn" to="/vue-basis">计算属性</router-link>
        </div>
      </div>
      <div class="label">
        <div class="title">vue原理</div>
        <div class="item-content">
          <router-link class="btn" to="/vue-source">原理</router-link>
        </div>
      </div>
      <div class="label">
        <div class="title">虚拟列表</div>
        <div class="item-content">
          <router-link class="btn" to="/virtual-list">虚拟列表</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home"
};
</script>
<style scoped>
.list {
  padding: 10px;
  border: 1px solid #e8e8e8;
}
.btn {
  font-size: 16px;
  background: #ccc;
  color: #fff;
  padding: 5px;
  display: inline-block;
  text-decoration: none;
}
.item-content {
  padding: 10px;
  text-align: left;
}
.title {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  padding: 5px 0;
}
.label {
  margin-top: 10px;
  background: #f0f0f0;
  display: grid;
}
.myClass {
  animation-name: fadeIn; /* 不带前缀的放到最后 */
}
/* 复杂属性 keyframes */

/* 不带前缀的放到最后 */
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}
</style>
<style lang="scss">
* {
  font-size: 16px;
}
</style>
