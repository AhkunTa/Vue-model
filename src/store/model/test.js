import { Model } from "@vuex-orm/core";
import TestModel from "./testModel";

export default class Test extends Model {
  static entity = "test";

  // static primaryKey = "id";

  static fields() {
    return {
      user_id: this.attr(null),
      id: this.uid(),
      email: this.attr("example@exammple.com"),
      hobby: this.attr(""),
      other_id: this.attr(null),
      user: this.belongsTo(TestModel, "user_id")
    };
  }
}
