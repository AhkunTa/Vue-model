<template>
  <div>
    <div class="container" @scroll="scrollHandle">
      <div class="actual-list"></div>
      <div class="list" :style="{ height: total * itemHeight + 'px' }">
        <li v-for="(item, index) in list" :style="item.style" :key="index">
          不定高度列表数据 -----------{{ item.text }}
        </li>
      </div>
    </div>
  </div>
  <!-- <div></div> -->
</template>
<script>
export default {
  data() {
    return {
      // 初始列表
      list: [
        {
          index: 1
        },
        {
          index: 2
        },
        {
          index: 3
        },
        {
          index: 4
        },
        {
          index: 5
        },
        {
          index: 6
        }
      ],
      length: 10,
      itemHeight: 100,
      startIndex: 0,
      endIndex: 10,
      total: 100,
      // 不定高引入cache数组缓存每个元素的高度
      cache: [],
      estimateHeight: 100,
      itemSizeGetter: {
        type: Function
      }
    };
  },
  methods: {
    scrollHandle(event) {
      console.log(event.target.scrollTop);
      // console.log(event);
      let scrollTop = event.target.scrollTop;
      let currentIndex = Math.floor(scrollTop / this.itemHeight);

      if (currentIndex !== this.startIndex) {
        this.startIndex = currentIndex;
        // endIndex 不能超过total
        this.endIndex = Math.min(currentIndex + 9, this.total - 1);
        this.list = this.freshList();
      }
    },
    // 获取内容高度
    contentHeight() {
      const { list, itemSizeGetter } = this;
      let total = 0;
      for (let i = 0, j = list.length; i < j; i++) {
        total += itemSizeGetter.call(null, list[i], i);
      }
      return total;
    },
    freshList() {
      let content = [];
      for (let i = this.startIndex; i <= this.endIndex; i++) {
        content.push({
          index: i,
          text: (() => {
            // 随机字符长度
            let length = Math.floor(Math.random() * 10);
            let text = "";
            for (let i = 0; i < length; i++) {
              text += "a";
            }
            return text;
          })()
        });
      }
      return content;
    },
    findNearestItemIndex(scrollTop) {
      const { list, itemSizeGetter } = this;
      let total = 0;
      for (let i = 0, j = list.length; i < j; i++) {
        const size = itemSizeGetter.call(null, list[i], i);
        total += size;
        if (total >= scrollTop || i === j - 1) {
          return i;
        }
      }
      return 0;
    },
    getItemSizeAndOffset(index) {
      const { list, itemSizeGetter } = this;
      let total = 0;
      for (let i = 0, j = Math.min(index, list.length - 1); i <= j; i++) {
        var size = itemSizeGetter.call(null, list[i], i);
        if (i === j) {
          return {
            offset: total,
            size
          };
        }
        total += size;
      }
      return {
        offset: 0,
        size: 0
      };
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
  position: relative;
}
.actual-list {
  height: 8000px;
  position: relative;
  z-index: -1;
}

.list {
  width: 100%;
  position: absolute;
  top: 0px;
}
.list li {
  background: #ccc;
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  padding: 20px;
  list-style: none;
}
</style>
>
