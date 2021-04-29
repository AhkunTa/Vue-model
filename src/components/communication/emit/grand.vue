<template>
  <div class="list">
    <div class="title">爷组件</div>
    <div class="item">
      <div>a: {{ a }}</div>
      <div>b: {{ b }}</div>
      <div>observable: {{ observable }}</div>

      <div v-for="(item, index) in list.arr" :key="index">
        <div>数组元素{{ index + 1 }} : {{ item.a }}</div>
      </div>
      <button @click="click">修改值爷组件</button>

      <parent :a="a" :b.sync="b" :list="list"></parent>
    </div>
  </div>
</template>

<script>
import parent from "./parent.vue";

export default {
  data() {
    return {
      a: {
        b: {
          c: 111
        }
      },
      b: 123,
      list: {
        arr: [{ a: 333 }, { a: 444 }]
      },
      ob: {
        e: 777,
        f: {
          g: 666
        }
      },
      observable: function() {
        return this.observable(this.ob);
      }
    };
  },
  provide: {
    provideObj: {
      obj: {
        a: 999,
        b: {
          c: 888
        }
      }
    }
  },
  components: {
    parent
  },
  methods: {
    click() {
      this.b++;
      this.a.b.c++;
      this.list.arr[0].a++;
    }
  }
};
</script>
<style scoped></style>
