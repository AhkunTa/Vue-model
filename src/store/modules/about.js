export default {
  namespaced: true,

  state: {
    count: 1000,
    name: '李四',
    age: 1000,
    surname: '李',
    lastname: '四',
    page:'about'
  },
  getters: {
    countTodo: state => '数量' + state.count,
    nameTodo: (state, getters) => {
      return '名字' + state.name +'\n'+ getters.ageTodo
    },
    ageTodo: state => '年龄' + state.age,
    surname: state => '姓' + state.surname,
    lastname: state => '名' + state.lastname,
  },
  mutations: {
    increment(state, num) {
      state.count += num
    },
    reduce(state, num) {
      state.count -= num
    },
    multiply(state,num) {
      state.count *=num
    }
  },
  actions: {
    increment(context, num) {
      console.log('action ele 1',context)
      console.log('action ele 2',num)

      return new Promise((resolve, reject) => {
        setTimeout(function () {
          if (context.state.count > 400) {
            reject();
          } else {
            context.commit('increment', num);
            resolve();
          }
        }, 1000);
      })

    }
  },



}