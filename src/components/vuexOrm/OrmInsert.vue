<template>
  <div>
    <div>Insert</div>
  </div>
</template>

<script>
import Test from "@store/model/test.js";
import TestModel from "@store/model/testModel.js";

export default {
  created() {
    const test = [
      {
        name: "张三",
        sex: "woman",
        user_id: "uniqueId111",
        author: {
          testId: 11,
          name: "李四",
          email: "john@example.com"
        }
      }
    ];

    TestModel.insert({ data: test });
  }
};
</script>
<style scoped></style>
