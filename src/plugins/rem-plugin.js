class remPlugin {
  install = function(Vue) {
    const rem = (Vue.rem = Vue.prototype.$rem = Vue.observable({ base: 0 }));
    Vue.mixin({
      methods: {
        onresize() {
          let target;
          if (window.self != window.top) {
            let { offsetWidth: width, offsetHeight: height } = document.body;
            target = width;
            if (width > height) {
              target = height;
            }
          } else {
            let { width, height } = window.screen;
            target = width;
            if (width > height) {
              target = height;
            }
          }
          let remBase = target / 18.75;
          remBase = remBase - (remBase % 2);
          document.documentElement.setAttribute(
            "style",
            `font-size:${remBase}px !important`
          );
          rem.base = remBase;
        }
      },
      created() {
        window.onorientationchange = window.onresize = this.onresize;
        this.onresize();
      }
    });
  };
}

export default new remPlugin();
