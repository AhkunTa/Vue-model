<template>
  <!-- <div>
    <div class="container" @scroll="scrollHandle">
      <div class="actual-list"></div>
      <div class="list" :style="{ height: total * itemHeight + 'px' }">
        <li v-for="(item, index) in list" :style="item.style" :key="index">
          不定高度列表数据{{ item.index }}
        </li>
      </div>
    </div>
  </div> -->
  <div></div>
</template>
<script>
// export default {
//   data() {
//     return {
//       // 初始列表
//       list: [
//         {
//           index: 1,
//           style: {
//             top: "0px"
//           }
//         },
//         {
//           index: 2,
//           style: {
//             top: "100px"
//           }
//         },
//         {
//           index: 3,
//           style: {
//             top: "200px"
//           }
//         },
//         {
//           index: 4,
//           style: {
//             top: "300px"
//           }
//         },
//         {
//           index: 5,
//           style: {
//             top: "400px"
//           }
//         },
//         {
//           index: 6,
//           style: {
//             top: "500px"
//           }
//         }
//       ],
//       length: 10,
//       itemHeight: 100,
//       startIndex: 0,
//       endIndex: 10,
//       total: 100,
//       // 不定高引入cache数组缓存每个元素的高度
//       cache: [],
//       estimateHeight: 100
//     };
//   },
//   methods: {
//     scrollHandle(event) {
//       console.log(event.target.scrollTop);
//       // console.log(event);
//       let scrollTop = event.target.scrollTop;
//       let currentIndex = Math.floor(scrollTop / this.itemHeight);

//       if (currentIndex !== this.startIndex) {
//         this.startIndex = currentIndex;
//         this.endIndex = Math.min(currentIndex + 9, this.total - 1);
//         this.list = this.freshList();
//       }
//     },
//     contentHeight() {
//       const { list, itemSizeGetter } = this;
//       let total = 0;
//       for (let i = 0, j = data.length; i < j; i++) {
//         total += itemSizeGetter.call(null, data[i], i);
//       }
//       return total;
//     },
//     freshList() {
//       for (let i = this.startIndex; i <= this.endIndex; i++) {
//         content.push({
//           index: i,
//           style: {
//             top: i * this.itemHeight + "px"
//           }
//         });
//       }
//       return content;
//     },
//     getItemSizeAndOffset(index) {
//       const { list, itemSizeGetter } = this;
//       let total = 0;
//       for (let i = 0, j = Math.min(index, list.length - 1); i <= j; i++) {
//         var size = itemSizeGetter.call(null, data[i], i);

//         if (i === j) {
//           return {
//             offset: total,
//             size
//           };
//         }
//         total += size;
//       }

//       return {
//         offset: 0,
//         size: 0
//       };
//     }
//   },
//   created() {},
//   mounted() {
//     this.$nextTick(() => {});
//   }
// };
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
}
</style>
>
