<template>
  <div>
    <div class="title">v-if v-show 原理</div>
    <!-- 起因是因为 当我使用v-show v-if直接展示了我不想展示的字符串 如下-->
    <div v-show="'0'">v-show展示</div>
    <div v-if="'0.0'">v-if展示</div>
    <!-- 以上都是我不想展示的元素 -->
  </div>
</template>

<script>
export default {};
</script>
<style scoped></style>
