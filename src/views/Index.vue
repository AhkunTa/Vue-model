<template>
  <div class="index-page">
    <div class="label">
      <div class="title">组件通信方法</div>
      <router-link class="btn" to="/component-communicate">
        provide-inject
      </router-link>
    </div>
    <div class="label">
      <div class="title">vuex-orm设置</div>
      <router-link class="btn" to="/vuex-orm">vuex-orm</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home"
};
</script>
<style scoped>
.label {
  border: 1px solid;
}
</style>
