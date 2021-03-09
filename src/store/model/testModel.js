import { Model } from "@vuex-orm/core";
import Test from "./test.js";

export default class TestModel extends Model {
  static entity = "testModel";
  // 主键申明
  // static primaryKey = "id";

  // static fields() {
  //   return {
  //     testModelId: this.attr(null),
  //     name: this.attr(""),
  //     sex: this.attr("man"),
  //     author: this.belongsTo(Test, "user_id")
  //   };
  // }

  static fields() {
    return {
      id: this.number(null),
      name: this.attr(""),
      sex: this.attr("man"),
      profile: this.hasOne(Test, "user_id", "other_id")
    };
  }
}
