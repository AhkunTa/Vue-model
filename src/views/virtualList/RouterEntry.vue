<template>
  <div class="page">
    <div class="label">
      <div class="title">虚拟列表实现</div>
      <router-link
        class="router-link"
        :to="{ name: 'virtual1' }"
        tag="div"
        active-class="active"
      >
        固定高度列表
      </router-link>
      <router-link
        class="router-link"
        :to="{ name: 'virtual2' }"
        tag="div"
        active-class="active"
      >
        不定高度列表
      </router-link>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "VueBasis",
  data() {
    return {};
  }
};
</script>
<style scoped></style>
