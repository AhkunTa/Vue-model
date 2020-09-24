import { Model } from "@vuex-orm/core";

export default class Test extends Model {

  static entity = 'test';

  static primaryKey = 'testPrimarKey';

  static fields(){
    return {
      testId: this.string(""),
      id: this.attr(''),
      name: this.attr(''),
      email: this.attr('')
    }
  }

}