<template>
  <div>
    <div>Observer 观察器原理</div>
    <div v-for="(item, index) in arrData" :key="index + '22'">
      <div>{{ item }}</div>
    </div>
    <div v-for="(item, index) in arrData2" :key="index + '12'">
      <div>{{ item }}</div>
    </div>
  </div>
</template>

<script>
// 基础对象响应式更新 通过Object.defineProperty
function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val, //值
    enumerable: !!enumerable, //定义了对象的属性是否可以在 for...in 循环和 Object.keys() 中被枚举。
    writable: true, //可以 改写 value
    configurable: true //configurable特性表示对象的属性是否可以被删除，以及除writable特性外的其他特性是否可以被修改。
  });
}

// 因为是数组基础元素 无法使用 Object.defineProperty  [{a:1,b:2}] 数组内包含对象可以使用此方法
// vue内监听了Array.prototype 上的一些基础属性
// 主要是 'push','pop','shift','unshift','splice','sort','reverse'
// 当数组调用了这些方法之后 直接触发notify() 函数触发更新
// 源码

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);
var methodsToPatch = [
  "push",
  "pop",
  "shift",
  "unshift",
  "splice",
  "sort",
  "reverse"
];
methodsToPatch.forEach(function(method) {
  var original = arrayProto[method];
  // 此处 监听了数组原型方法 Array.prototype 上的各个方法实现响应式更新数组数据
  // 主要是 'push','pop','shift','unshift','splice','sort','reverse' 这几个
  def(arrayMethods, method, function mutator() {
    var args = [],
      len = arguments.length;
    while (len--) args[len] = arguments[len];

    var result = original.apply(this, args);
    var ob = this.__ob__;

    var inserted;
    switch (method) {
      case "push":
      case "unshift":
        inserted = args;
        break;
      case "splice":
        inserted = args.slice(2);
        break;
    }
    if (inserted) {
      //观察数组数据
      ob.observeArray(inserted);
    }
    // notify change
    //更新通知
    ob.dep.notify();
    return result;
  });
});

function set(target, key, val) {
  // 这段判断可以忽略
  // if (
  //   "development" !== "production" &&
  //   //判断数据 是否是undefined或者null
  //   (isUndef(target) || isPrimitive(target)) //判断数据类型是否是string，number，symbol，boolean
  // ) {
  //   //必须是对象数组才可以 否则发出警告
  //   warn(
  //     "Cannot set reactive property on undefined, null, or primitive value: " +
  //       target
  //   );
  // }

  //如果是数组  并且key是数字
  if (
    Array.isArray(
      target
    ) /* 此方法重要可以忽略 防止报错 && isValidArrayIndex(key) */
  ) {
    //设置数组的长度
    target.length = Math.max(target.length, key);

    // 如果是数组 还是调用的 splice 方法
    target.splice(key, 1, val);
    return val;
  }
  //判断key是否在target 上，并且不是在Object.prototype 原型上，而不是通过父层原型链查找的
  if (key in target && !(key in Object.prototype)) {
    target[key] = val; //赋值
    return val;
  }
  var ob = target.__ob__; //声明一个对象ob 值为该target对象中的原型上面的所有方法和属性 ，表明该数据加入过观察者中
  //vmCount 记录vue被实例化的次数
  //是不是vue
  // if (target._isVue || (ob && ob.vmCount)) {
  //   //如果不是生产环境，发出警告
  //   "development" !== "production" &&
  //     warn(
  //       "Avoid adding reactive properties to a Vue instance or its root $data " +
  //         "at runtime - declare it upfront in the data option."
  //     );
  //   return val;
  // }
  //如果ob不存在 说明他没有添加观察者 则直接赋值
  // ob 不存在 说明属性不是双向绑定 也就是说 当前属性在Vue实例化的时候 其属性没有 被 new Observer
  if (!ob) {
    target[key] = val;
    return val;
  }
  //通知订阅者ob.value更新数据 添加观察者  define  set get 方法
  // 手动给其属性添加 双向绑定 defineReactive 为双向绑定关键方法

  /* defineReactive(ob.value, key, val); */
  // defineReactive 主要

  //通知订阅者ob.value更新数据
  ob.dep.notify();
  return val;
}

export default {
  data() {
    return {
      arrData: ["数组观察测试1", "数组观察测试2", "数组观察测试3"],
      arrData2: ["数组观察测试1", "数组观察测试2", "数组观察测试3"]
    };
  },
  components: {},
  updated(val) {
    console.log(val);
  },
  async mounted() {
    await this.$nextTick();
    this.arrData[0] = 111;
    this.arrData2[0] = 111;
    // 直接修改 数据的值 数据不会响应式改编
    // 通过 下面调用splice方法

    this.arrData2.splice(0, 1, 12312);
    // 或者直接这样更新
    this.$set(this.arrData, 0, 123241);
    // 或者来个骚操作  在源码上其实就是触发了  __ob__.dep.notify()
    this.arrData.__ob__.dep.notify();

    // 那么 问题来了 $set 原理 ？
    // $set 首先判断是否是 数组 如果是数组则直接调用 splice方法
    // 如果是对象那就按照之前 直接触发修改会自动调用__ob__的侦听方法
  }
};
</script>
<style scoped></style>
