<template>
  <div class="page">
    <div class="label">
      <div class="title">父子组件通信</div>
      <router-link
        :to="{ name: 'provideInject' }"
        tag="div"
        active-class="active"
        class="router-link"
      >
        provideInject
      </router-link>
      <router-link
        :to="{ name: 'attrsListeners' }"
        tag="div"
        active-class="active"
        class="router-link"
      >
        attrsListeners
      </router-link>
      <router-link
        class="router-link"
        :to="{ name: 'bus' }"
        tag="div"
        active-class="active"
      >
        bus
      </router-link>
      <router-link
        class="router-link"
        :to="{ name: 'slot' }"
        tag="div"
        active-class="active"
      >
        slot
      </router-link>
      <router-link
        class="router-link"
        :to="{ name: 'emit' }"
        tag="div"
        active-class="active"
      >
        emit
      </router-link>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "componentCommunicate",
  data() {
    return {};
  }
};
</script>
<style scoped></style>
