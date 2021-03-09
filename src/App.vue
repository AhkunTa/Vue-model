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

/* global style */

.label {
  border: 1px solid;
}
.active {
  color: #ae86ff;
  text-decoration: none;
}
.title {
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  padding: 5px 0;
}
.router-link {
  height: 50px;
  line-height: 50px;
}
.btn {
  padding: 5px;
  background: #4586ff;
  color: #fff;
  /* width: 200px; */
  border-radius: 5px;
  text-align: center;
}
.item {
  margin-top: 10px;
  background: #f0f0f0;
}
</style>
