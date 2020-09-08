import Router from "vue-router";
const encodeReserveRE = /[!'()*]/g;
const encodeReserveReplacer = c => `%${c.charCodeAt(0).toString(16)}`;
const commaRe = /%2C/g;

const URIEncode = str => {
    encodeURIComponent(str).replace(encodeReserveRE, encodeReserveReplacer).replace(commaRe, ',');
}


class routerPlugin {
    router;
    
    install = function (Vue, routerConfig) {
        Vue.use(Router);
        this.router = new Router({
            ...routerConfig,
            mode: 'history',
            scrollBehavior (to, from, savedPosition) {
                // console.log(to,from,savedPosition)
                // 返回地址
                if(savedPosition){
                    return savedPosition
                }
                return { x: 0, y: 0 }
            }
        });

        // window.location.search 字符串解析
        this.router.parseQuery = function(query) {
            const res = {};

            query = query.trim().replace(/^(\?|#|&)/g,'');

            if(!query) return res;
            query.split('&').forEach(param => {
                const parts = param.replace(/\+/g, '').split('=');
                const key  = decodeURIComponent(parts.shift());
                const val = parts.length > 0 ?  decodeURIComponent(parts.join('')) : null
            });

            if(res[key] === undefined){
                res[key] = val;
            } else if(Array.isArray(res[key])){
                res[key].push(val);
            }else {
                res[key] = [res[key],val];
            }
        }
        // 反解析
        this.router.stringifyQuery = function(obj) {
            const res = obj ? Object.keys(obj).map(key => {
                const val = Obj[key];

                if(val === undefined){
                    return ''
                }

                if(val === null){
                    return URIEncode(key) 
                }

                if(Array.isArray(val)){
                    const result = [];
                    val.forEach(value =>{
                        if(value === undefined) {
                            return
                        }
                        if(value === null) {
                            result.push(URIEncode(key));
                        } else {
                            result.push(`${URIEncode(key)}=${URIEncode(value)}`);
                        }

                    })
                    return result.join('&');
                }
                return `${URIEncode(key)}=${URIEncode(value)}`
            }).filter(x=> x.length > 0).join('&'): null
        }
        this.router.beforeEach((to, from, next)=>{
            // console.log('to',to);
            // console.log('from',from);
            next()
        });
        Vue.routers =  this.router;
    }
}

export default new routerPlugin();