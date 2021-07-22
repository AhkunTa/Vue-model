// 此文件内容为 strats.html 执行模板编译前的方法
(function anonymous() {
  with (this) {
    return _c(
      "div",
      { attrs: { id: "app" } },
      [
        _c("div", { staticClass: "btn", on: { click: push } }, [_v("push")]),
        _v(" "),
        _c("div", { staticClass: "btn", on: { click: pop } }, [_v("pop")]),
        _v(" "),
        _c("div", { staticClass: "btn", on: { click: splice } }, [
          _v("splice")
        ]),
        _v(" "),
        _l(testArr, function(item, key, index) {
          return _c("div", { key: index }, [
            _v(
              "\n        diff 算法 比较 item: " +
                _s(item) +
                " , key: " +
                _s(index) +
                "\n      "
            )
          ]);
        }),
        _v(" "),
        _l(forIn, function(item, key, index) {
          return _c("div", { key: index }, [
            _c("div", [
              _v(
                "\n          for in 源码比较 item : " +
                  _s(item) +
                  " - key: " +
                  _s(key) +
                  " - index: " +
                  _s(index) +
                  "\n        "
              )
            ])
          ]);
        }),
        _v(" "),
        _l(forOf, function(item, key, index) {
          return _c("div", { key: index }, [
            _c("div", [
              _v(
                "\n          for of 源码比较 item : " +
                  _s(item) +
                  " - key: " +
                  _s(key) +
                  " - index: " +
                  _s(index) +
                  "\n        "
              )
            ])
          ]);
        }),
        _v(" "),
        _c(
          "div",
          {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: false,
                expression: "false"
              }
            ]
          },
          [_v("v-show源码展示")]
        ),
        _v(" "),
        _c(
          "div",
          {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: true,
                expression: "true"
              }
            ]
          },
          [_v("v-show源码展示")]
        ),
        _v(" "),
        false ? _c("div", [_v("v-if 源码展示1")]) : _e(),
        _v(" "),
        true ? _c("div", [_v("v-if 源码展示2")]) : _e(),
        _v(" "),
        "0" ? _c("div", [_v("v-if 源码展示3")]) : _e(),
        _v(" "),
        true ? _c("div", [_v("v-if 源码展示4")]) : _e()
      ],
      2
    );
  }
});
