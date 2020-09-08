import axios from "axios";
import {merge } from "lodash";
import constsUtil from "@utils/const-utils.js"
class servicePlugin {
  install(Vue, options) {
    let http = axios.create();
    Vue.http = Vue.prototype.$http = http;

    let consts = { ...constsUtil}
    Vue.consts = Vue.prototype.$consts = consts;
    if (options) {
      let apis = {};
      let service = async function (apiName, options) {
        return apis[apiName].call(this, options)
      }

      let http = axios.create()
      options.apiList.forEach(function (api) {
        if (api.name) {
          if (api.handler) {
            apis[api.name] = api.handler;
          } else if (api.url && api.method && api.baseURL) {
            apis[api.name] = async options => {
              // console.log(options)
              // if (typeof api.url === 'function') {
              //   options.url = api.url(options.pathParam);
              // }
              // console.log(api,options)
              let param = merge( api, options)
              let res = await http.request(param);
              return res.data;
            }
          }
        }
      })
      Vue.service = Vue.prototype.$service = service;
      if (typeof options.created === 'function') {
        options.created(Vue)
      }
    }

  }

}


export default new servicePlugin();