<template>
  <div>
    <div>inject</div>
    <div>{{ provideTest.testData}}</div>
  </div>
</template>

<script>
export default {
  inject: ['provideTest'],
  // inject: {
  //   provideTest: {
  //     default: 'default'
  //   }
  // },
  data() {
    return {};
  },
  mounted(){
    setTimeout(() => {
      this.provideTest.testData = '9999'
    }, 2000);
  }
};
</script>
<style scoped>
</style>
