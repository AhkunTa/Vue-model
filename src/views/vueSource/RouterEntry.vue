<template>
  <div class="page">
    <div class="label">
      <div class="title">Vue-源码部分解析 Vue版本2.5.16</div>
      <router-link
        class="router-link"
        :to="{ name: 'observer' }"
        tag="div"
        active-class="active"
      >
        Observer观察器
      </router-link>
      <router-link
        class="router-link"
        :to="{ name: 'showif' }"
        tag="div"
        active-class="active"
      >
        show-if原理
      </router-link>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "VueSource",
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
