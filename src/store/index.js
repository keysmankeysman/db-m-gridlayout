import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    periodsInt: [{
        period: "day",
        id: 1,
        name: "День"
    }, {
        period: "year",
        id: 2,
        name: "Год"
    }, {
        period: "week",
        id: 3,
        name: "Неделя"
    }, {
        period: "month",
        id: 4,
        name: "Месяц"
    }, {
        period: "quarter",
        id: 5,
        name: "Квартал"
    }, {
        period: "lastday3",
        id: 9,
        name: "Последние 3 дня"
    }, {
        period: "realtime",
        id: 19,
        name: "RealTime"
    }]
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
  },
})
