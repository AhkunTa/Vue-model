<template>
  <div>
    <div class="container" @scroll="scrollHandle">
      <div class="list" :style="{ height: total * itemHeight + 'px' }">
        <li v-for="(item, index) in list" :style="item.style" :key="index">
          列表数据{{ item.index }}
        </li>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 初始列表
      list: [
        {
          index: 0,
          style: {
            top: "0px"
          }
        },
        {
          index: 1,
          style: {
            top: "100px"
          }
        },
        {
          index: 2,
          style: {
            top: "200px"
          }
        },
        {
          index: 3,
          style: {
            top: "300px"
          }
        },
        {
          index: 4,
          style: {
            top: "400px"
          }
        }
      ],
      length: 10,
      itemHeight: 100,
      startIndex: 1,
      endIndex: 10,
      total: 100,
      // 增加缓冲区 防止空白区域
      buffer: 5
    };
  },
  methods: {
    scrollHandle(event) {
      console.log(event.target.scrollTop);
      // console.log(event);
      let scrollTop = event.target.scrollTop;
      let currentIndex = Math.floor(scrollTop / this.itemHeight);

      if (currentIndex !== this.startIndex) {
        this.startIndex = Math.max(currentIndex - this.buffer, 0);
        this.endIndex = Math.min(currentIndex + 9, this.total - 1);
        this.list = this.freshList();
      }
    },
    freshList() {
      let content = [];
      for (let i = this.startIndex; i <= this.endIndex; i++) {
        content.push({
          index: i,
          style: {
            top: i * this.itemHeight + "px"
          }
        });
      }
      return content;
    }
  }
};
</script>
<style scoped>
.container {
  overflow: hidden auto;
  height: 400px;
  /* padding: 20px 0; */
  background: yellow;
}
.list {
  overflow-y: scroll;
  position: relative;
}
.list li {
  /* margin-top: 20px; */
  background: #ccc;
  text-align: center;
  height: 100px;
  position: absolute;
  left: 0;
  right: 0;
  line-height: 100px;
}
</style>
>
