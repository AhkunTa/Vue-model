<template>
  <div>
    <div>Slot</div>
    <SlotChild1>
      <template class="uuname" v-slot:default="slotProps">
        <div class="un">作用域插槽 {{ slotProps }}</div>
      </template>
      <template v-slot:slot1>
        <div class="name-slot">具名插槽</div>
      </template>
    </SlotChild1>
    <SlotChild2></SlotChild2>
  </div>
</template>

<script>
import SlotChild1 from "@components/SlotChild1.vue";
import SlotChild2 from "@components/SlotChild2.vue";

export default {
  data() {
    return {
      // name: 333
    };
  },
  mounted() {},
  components: {
    SlotChild1,
    SlotChild2
  },
  created() {
    console.log(this.slotProps);
  }
};
</script>
<style scoped></style>
