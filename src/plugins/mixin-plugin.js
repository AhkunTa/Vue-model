
class MixInPlugin {
    install(Vue,mixinConfig){
        Vue.mixin({
            created (){
                // console.log(mixinConfig.name)
            }
        })
    }
}

export default new MixInPlugin;