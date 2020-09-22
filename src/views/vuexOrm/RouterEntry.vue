<template>
  <div class="page">
    <div class="label">
      <div class="title">父子组件通信</div>
      <router-link :to="{ name:'provideInject'}"  tag="div" active-class="active">provideInject</router-link>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "componentCommunicate",
  data(){
    return {
      
    }
  }
};
</script>
<style scoped>
.label {
  border: 1px solid ;
}
.active {
  color: #ffdb6f;
  text-decoration: none;;
}
</style>
