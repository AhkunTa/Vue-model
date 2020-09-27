import { Model } from "@vuex-orm/core";
import Test from "./test.js";

export default class TestModel extends Model {
  static entity = "testModel";
  static primaryKey = "testModelPrimarKey";

  static fields() {
    return {
      id: this.attr(null),
      user_id: this.attr(null),
      title: this.attr(""),
      body: this.attr(""),
      published: this.attr(false),
      author: this.belongsTo(Test, "user_id")
    };
  }

  static get entity() {
    return "TestModel";
  }
}
