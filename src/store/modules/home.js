export default {
  namespaced: true,

  state: {
    count: 12138,
    name: '张三',
    age: 22,
    surname: '张',
    lastname: '三',
    page: 'home'
  },
  getters: {
    countTodo: state => '数量' + state.count,
    nameTodo: (state, getters) => '名字' + state.name + getters.ageTodo,
    ageTodo: state => '年龄' + state.age,
    surnameTodo: state => '姓' + state.surname,
    lastnameTodo: state => '名' + state.lastname,
  },
  mutations: {
    increment(state, num) {
      state.count -= num
    },
    reduce(state, num) {
      state.count -= num
    }
  },
  actions: {
    increment(context, num) {
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