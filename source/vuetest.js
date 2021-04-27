/* ======================= Dep */

/*
 */
function Dep() {
  this.subs = [];
}

Dep.prototype.notify = function() {
  this.subs.forEach(sub => {
    sub.update();
  });
};

Dep.prototype.add = function(sub) {
  this.subs.push(sub);
};

Dep.target = null;

/* ================== Watcher 监听器 */
/* 监听器的update方法是进行双向绑定的关键
 */
var Watcher = function Watcher(vm, attr, cb) {
  this.vm = vm;
  this.cb = cb;
  this.attr = attr;
  this.value = this.get();
};

Watcher.prototype.get = function get() {
  Dep.target = this;
  var value = this.vm.data[this.attr]; // 强制执行 get方法
  Dep.target = null;
  return value;
};

Watcher.prototype.update = function update() {
  this.run();
};

Watcher.prototype.run = function run() {
  console.log(222);
  var value = this.vm.data[this.attr];
  var oldVal = this.value;
  if (value !== oldVal) {
    this.value = value;
    this.cb.call(this.vm, value, oldVal);
  }
};

/* ================== Observer 观察器 */
/* 观察器主要 进行对象的get set 方法劫持
   在元素发生变化时 进行通知 
*/
function observe(data) {
  if (!data || typeof data !== "object") return;

  Object.keys(data).forEach(key => {
    defineReactive(data, key, data[key]);
  });
}

function defineReactive(obj, key, val) {
  // 递归观察val
  observe(val);
  let dep = new Dep();
  Object.defineProperty(obj, key, {
    get: function getter() {
      if (Dep.target) {
        dep.add(Dep.target);
      }
      console.log(dep);

      return val;
    },
    set: function setter(newVal) {
      if (val == newVal) {
        return;
      }
      val = newVal;
      dep.notify();
    }
  });
}

/* ======================== Compile 模板编译 */
/* 模板编译语法
 */

function Compile(el, vm) {
  this.el = document.querySelector(el);
  this.vm = vm;

  this.init();
}

Compile.prototype.init = function() {
  if (this.el) {
    let fragment = this.createDocumentFragment(this.el);
    this.compileElement(fragment);
    this.el.appendChild(fragment);
    console.log(fragment);
  }
};
Compile.prototype.createDocumentFragment = function(el) {
  // 将app下的所有结点移动到fragment内
  let fragment = document.createDocumentFragment();
  let child = el.firstChild;
  while (el.firstChild) {
    fragment.appendChild(child);
    child = el.firstChild;
  }
  return fragment;
};

Compile.prototype.compile = function(el) {
  let;
};

Compile.prototype.compileElement = function(el) {
  let reg = /\{\{(.*)\}\}/;
  let childNodes = el.childNodes;
  console.log([...childNodes]);
  let vm = this.vm;
  [...childNodes].forEach(node => {
    // 字符节点编译
    if (this.isTextNode(node) && reg.test(node.nodeValue)) {
      // 获取模板编译 内部的值 如{{a}} 则获取 a
      let attr = reg.exec(node.nodeValue)[1];

      /* 匹配大括号问题 如{{}} {{}} 匹配失败 */

      // 直接渲染更新
      console.log(node.nodeValue, attr);
      node.nodeValue = this.vm.data[attr];
      // 调用监视器 值发生变化进行变更
      new Watcher(this.vm, attr, (newVal, oldVal) => {
        node.nodeValue = newVal;
        console.log(newVal, oldVal);
      });
    } else if (this.isElementNode(node)) {
      // 节点 获取属性值
      let attributes = node.attributes;

      [...attributes].forEach(attribute => {
        let name = attribute.name;
        let value = attribute.value;

        if (this.isDirective(name)) {
          // v-
          let key = name.substring(2);
          if (this.isEventDirective(key)) {
            // on:
            let event = name.split(":")[1];

            let cb = this.vm && this.vm.methods[value];
            if (event && cb) {
              node.addEventListener(event, cb.bind(vm), false);
            }
          } else {
            // 普通指令 v-bind v-for ...
          }
        }
      });
    }
    // 递归编译 子节点
    if (node.childNodes && node.childNodes.length) {
      this.compileElement(node);
    }
  });
};

Compile.prototype.isDirective = function(attr) {
  return attr.indexOf("v-") === 0;
};
Compile.prototype.isEventDirective = function(attr) {
  return attr.indexOf("on:") === 0;
};
Compile.prototype.isElementNode = function(node) {
  return node.nodeType === Node.ELEMENT_NODE; // 元素节点 返回1
};
Compile.prototype.isTextNode = function(node) {
  return node.nodeType === Node.TEXT_NODE; // 文本节点 返回3
};
// Vue方法
function Vue(options) {
  this.data = options.data;
  this.el = options.el;
  this.methods = options.methods;

  this.init();
}

Vue.prototype.init = function() {
  observe(this.data);

  new Compile(this.el, this);
};
