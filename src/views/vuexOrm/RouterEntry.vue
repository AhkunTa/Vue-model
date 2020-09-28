<template>
  <div class="page">
    <div class="label">
      <div class="title">Vue-ORM 基本操作</div>
      <router-link :to="{ name: 'insert' }" tag="div" active-class="active">
        Vue-Orm
      </router-link>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "VueOrm",
  data() {
    return {};
  }
};
</script>
<style scoped>
.label {
  border: 1px solid;
}
.active {
  color: #ffdb6f;
  text-decoration: none;
}
</style>
