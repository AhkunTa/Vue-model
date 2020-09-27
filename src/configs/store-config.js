// import store from '@/store/index.js'
import home from "@/store/modules/home.js";
import about from "@/store/modules/about.js";
import Test from "@/store/model/test.js";
import TestModel from "@/store/model/testModel.js";

let entities = [
  {
    name: "Test",
    model: Test,
    module: home
  },
  {
    name: "TestModel",
    model: TestModel,
    module: about
  }
];

export default {
  entities,
  options: {
    modules: {
      home,
      about
    }
  },
  //  useless
  plugins: []
};
