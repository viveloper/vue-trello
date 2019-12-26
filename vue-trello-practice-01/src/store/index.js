import Vue from 'vue'
import Vuex from 'vuex'
import api, { setAuthorizationHeader } from '../api'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        token: null,
        boards: []
    },
    getters: {

    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token
        },
        SET_BOARDS(state, boards) {
            state.boards = boards
        }
    },
    actions: {
        FETCH_BOARDS(context) {
            api.fetchBoards().then(data=>{
                context.commit('SET_BOARDS', data.list)
            })
        }
    }
})

if (localStorage.getItem('token')) {
    store.commit('SET_TOKEN', localStorage.getItem('token'))
    setAuthorizationHeader(localStorage.getItem('token'))
}

export default store