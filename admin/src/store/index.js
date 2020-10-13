import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api/index'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        medalsAll: [],
        token: []
    },
    mutations: {
        GET_TOKEN(state) {
            state.token = localStorage.getItem("token");
        },
        SET_TOKEN(state, token) {
            state.token = token;
            localStorage.setItem("token", token);
        }
    },
    actions: {
        login({ commit }, data) {
            api.login(data).then(data => {
                if (data.status) {
                    commit('SET_TOKEN', data.token);
                }
            })
        },
        getMedalsAll({ commit }, token) {
            api.getMedalsAll(token);
        }
    }

})