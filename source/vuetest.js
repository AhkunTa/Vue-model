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

Dep.prototype.depend = function depend() {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.target = null;

/* ================== Watcher 监听器 */
/* 监听器的update方法是进行双向绑定的关键
 */
var Watcher = function Watcher(vm, attr, cb) {
  this.vm = vm;
  this.cb = cb;
  this.attr = attr;
  this.depIds = new Set();
  this.newDepIds = new Set();
  this.deps = []; // 观察者队列
  this.newDeps = []; // 新的观察者队列
  this.value = this.get();
};

Watcher.prototype.get = function get() {
  Dep.target = this;
  var value = this.vm.data[this.attr]; // 强制执行 get方法
  Dep.target = null;
  return value;
};
Watcher.prototype.addDep = function addDep(dep) {
  var id = dep.id; //dep.id 一个持续相加的id
  if (!this.newDepIds.has(id)) {
    //如果id存在
    this.newDepIds.add(id); //添加一个id
    this.newDeps.push(dep); //添加一个deps
    if (!this.depIds.has(id)) {
      //如果depIds 不存在id则添加一个addSub  //添加一个sub
      dep.add(this);
    }
  }
};

Watcher.prototype.update = function update() {
  this.run();
};

Watcher.prototype.run = function run() {
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

var Observer = function Observer(data) {
  this.data = data;
  this.dep = new Dep();
  // 暂不考虑数组元素 只考虑object
  if (!data.__ob__) {
    Object.defineProperty(data, "__ob__", {
      value: this, //值
      enumerable: !!true, //定义了对象的属性是否可以在 for...in 循环和 Object.keys() 中被枚举。
      writable: true, //可以 改写 value
      configurable: true //configurable特性表示对象的属性是否可以被删除，以及除writable特性外的其他特性是否可以被修改。
    });
  }
  Object.keys(data).forEach(key => {
    defineReactive(data, key, data[key]);
  });
};

function observe(data) {
  if (!data || typeof data !== "object") return;

  var ob;

  ob = new Observer(data);
  return ob;
}

function defineReactive(obj, key, val, shallow) {
  // 递归观察val
  let _this = this;
  console.log(this);
  // observe(val);
  var dep = new Dep();

  Object.defineProperty(obj, key, {
    get: function getter() {
      if (Dep.target) {
        dep.add(Dep.target);
      }
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
  let reg = /\{\{(.*?)\}\}/g;
  let childNodes = el.childNodes;
  let vm = this.vm;
  [...childNodes].forEach(node => {
    // 字符节点编译
    if (this.isTextNode(node) && reg.test(node.nodeValue)) {
      // // 获取模板编译 内部的值 如{{a}} 则获取 a
      let attrArr = node.nodeValue.match(reg).map(item => {
        return item.slice(2, -2).trim();
      });
      // let text = node.nodeValue.split(reg);
      let template = node.nodeValue;
      node.nodeValue = mustache(template, this.vm.data);
      // 调用监视器 值发生变化进行变更
      attrArr.forEach(attr => {
        // 调用监视器 值发生变化进行变更
        new Watcher(this.vm, attr, (newVal, oldVal) => {
          // 重新进行mustache渲染
          node.nodeValue = mustache(template, this.vm.data);
        });
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
            // 其他指令 v-bind v-for v-model ... 待定
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

/* ======================== Mustache方法  */
/* 模板编译辅助方法 mustache核心功能
   实现mustache语法 源自mustache.js
   https://github.com/janl/mustache.js/
 */

// mustache scanner 扫描器 主要实现了 字符串模板语法从头到尾扫描
function Scanner(string) {
  this.string = string;
  this.tail = string;
  this.pos = 0;
}

Scanner.prototype.eos = function eos() {
  return this.tail === "";
};

Scanner.prototype.scan = function scan(re) {
  var match = this.tail.match(re);

  if (!match || match.index !== 0) return "";

  var string = match[0];

  this.tail = this.tail.substring(string.length);
  this.pos += string.length;

  return string;
};

Scanner.prototype.scanUntil = function scanUntil(re) {
  var index = this.tail.search(re),
    match;
  switch (index) {
    case -1:
      match = this.tail;
      this.tail = "";
      break;
    case 0:
      match = "";
      break;
    default:
      match = this.tail.substring(0, index);
      this.tail = this.tail.substring(index);
  }
  this.pos += match.length;
  return match;
};

function parseTemplate(template, tags) {
  var openingTagRe = /\{\{\s*/;
  var closingTagRe = /\s*\}\}/;

  var whiteRe = /\s*/;
  var spaceRe = /\s+/;
  var equalsRe = /\s*=/;
  var curlyRe = /\s*\}/;
  var tagRe = /#|\^|\/|>|\{|&|=|!/;

  var lineHasNonSpace = false;
  var sections = []; // Stack to hold section tokens
  var tokens = []; // Buffer to hold the tokens
  var spaces = []; // Indices of whitespace tokens on the current line
  var hasTag = false; // Is there a {{tag}} on the current line?
  var nonSpace = false; // Is there a non-space char on the current line?
  var indentation = ""; // Tracks indentation for tags that use it
  var tagIndex = 0; // Stores a count of number of tags encountered on a line

  var scanner = new Scanner(template);

  var start, type, value, chr, token, openSection;
  while (!scanner.eos()) {
    start = scanner.pos;

    // Match any text between tags.
    value = scanner.scanUntil(openingTagRe);

    if (value) {
      for (var i = 0, valueLength = value.length; i < valueLength; ++i) {
        chr = value.charAt(i);

        if (/\S/.test(chr)) {
          spaces.push(tokens.length);
          indentation += chr;
        } else {
          nonSpace = true;
          lineHasNonSpace = true;
          indentation += " ";
        }

        tokens.push(["text", chr, start, start + 1]);
        start += 1;

        // Check for whitespace on the current line.
        if (chr === "\n") {
          stripSpace();
          indentation = "";
          tagIndex = 0;
          lineHasNonSpace = false;
        }
      }
    }

    // Match the opening tag.
    if (!scanner.scan(openingTagRe)) break;

    hasTag = true;

    // Get the tag type.
    type = scanner.scan(/#|\^|\/|>|\{|&|=|!/) || "name";
    scanner.scan(/\s*/);

    // Get the tag value.

    value = scanner.scanUntil(closingTagRe);
    // Match the closing tag.
    if (!scanner.scan(closingTagRe))
      throw new Error("Unclosed tag at " + scanner.pos);
    token = [type, value, start, scanner.pos];
    tagIndex++;
    tokens.push(token);
    if (type === "#" || type === "^") {
      sections.push(token);
    } else if (type === "/") {
      // Check section nesting.
      openSection = sections.pop();
      if (!openSection)
        throw new Error('Unopened section "' + value + '" at ' + start);

      if (openSection[1] !== value)
        throw new Error(
          'Unclosed section "' + openSection[1] + '" at ' + start
        );
    } else if (type === "name" || type === "{" || type === "&") {
      nonSpace = true;
    }
  }
  openSection = sections.pop();

  if (openSection)
    throw new Error(
      'Unclosed section "' + openSection[1] + '" at ' + scanner.pos
    );

  return nestTokens(squashTokens(tokens));
}

function mustache(template, view) {
  if (typeof template !== "string") {
    throw new Error("template is not string");
  }

  let tokens = parseTemplate(template, view);
  let val = "";
  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i];
    let symb = token[0];

    if (symb == "name") {
      val += view[token[1]] || "";
    } else if (symb == "text") {
      val += token[1];
    }
  }
  return val;
}

function squashTokens(tokens) {
  var squashedTokens = [];

  var token, lastToken;
  for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
    token = tokens[i];

    if (token) {
      if (token[0] === "text" && lastToken && lastToken[0] === "text") {
        lastToken[1] += token[1];
        lastToken[3] = token[3];
      } else {
        squashedTokens.push(token);
        lastToken = token;
      }
    }
  }

  return squashedTokens;
}

function nestTokens(tokens) {
  var nestedTokens = [];
  var collector = nestedTokens;
  var sections = [];

  var token, section;
  for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
    token = tokens[i];

    switch (token[0]) {
      default:
        collector.push(token);
    }
  }

  return nestedTokens;
}

/* ======================== Vue对象  */
/*
 */

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
