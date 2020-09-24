<template>
  <div id="app">
    <RouterView></RouterView>
  </div>
</template>
<script>
export default {
  created() {
    // this.$service("testApi", {
    //   params: {
    //     aa: 111
    //   }
    // }).then(res => {
    //   console.log(res);
    // });
    // this.$service('crosApi',{
    //   params: {
    //     pageNo:1
    //   }
    // }).then((res)=>{
    //   console.log(res)
    // })
  }
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
