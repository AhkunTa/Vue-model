<template>
  <div>
    <div>AttrsListeners</div>
    <AttrsChildren
      :title="title"
      :bar="bar"
      :foo="foo"
      @test="test"
      baz="2312"
    ></AttrsChildren>
  </div>
</template>

<script>
import AttrsChildren from "@components/AttrsChildren.vue";

export default {
  data() {
    return {
      title: "标题",
      bar: "bar",
      foo: "foo"
    };
  },
  components: {
    AttrsChildren
  },
  methods: {
    test(value) {
      console.log(value);
    }
  }
};
</script>
<style scoped></style>
