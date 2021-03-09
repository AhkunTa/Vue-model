<template>
  <div class="page">
    <div class="label">
      <div class="title">Vue基本操作</div>
      <router-link
        class="router-link"
        :to="{ name: 'computed' }"
        tag="div"
        active-class="active"
      >
        Computed
      </router-link>
      <router-link
        class="router-link"
        :to="{ name: 'component' }"
        tag="div"
        active-class="active"
      >
        Component
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
.router-link {
  height: 50px;
  line-height: 50px;
}
</style>
