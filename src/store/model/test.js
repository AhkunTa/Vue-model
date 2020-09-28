import { Model } from "@vuex-orm/core";

export default class Test extends Model {
  static entity = "test";

  static primaryKey = "testId";

  static fields() {
    return {
      testId: this.attr(null),
      name: this.attr(""),
      email: this.attr(null)
    };
  }
}
