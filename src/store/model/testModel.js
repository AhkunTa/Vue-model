import { Model } from "@vuex-orm/core";
import Test from "./test.js";

export default class TestModel extends Model {
  static entity = "testModel";
  static primaryKey = "testModelId";

  static fields() {
    return {
      testModelId: this.attr(null),
      name: this.attr(""),
      sex: this.attr("man"),
      author: this.belongsTo(Test, "user_id")
    };
  }
}
