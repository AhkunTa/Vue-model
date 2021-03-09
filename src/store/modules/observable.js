import Vue from "vue";
let store = Vue.observable({
  name: "111",
  age: 28
});

let mutations = {
  addAge: function(count) {
    store.age += count;
  },
  changeName: function(name) {
    store.name = name;
  }
};

export { store, mutations };
