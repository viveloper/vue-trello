import Vue from 'vue'
import Vuex from 'vuex'
import api, { setAuthorizationHeader } from '../api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: null,
    isAddBoard: false,
    boards: [],
    board: {},
    isShowBoardSettings: false,
  },
  getters: {

  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_BOARDS(state, boards) {
      state.boards = boards
    },
    SET_IS_ADD_BOARD(state, show) {
      state.isAddBoard = show
    },
    SET_BOARD(state, board) {
      state.board = board      
    },
    SET_IS_SHOW_BOARD_SETTINGS(state, show) {
      state.isShowBoardSettings = show
    }
  },
  actions: {
    FETCH_BOARDS(context) {
      return api.fetchBoards().then(data => {
        context.commit('SET_BOARDS', data.list)        
      })
    },
    ADD_BOARD(context, title) {
      return api.addBoard(title).then(data => {        
        context.commit('SET_BOARD', data.item)
        context.dispatch('FETCH_BOARDS')
        return data.item
      })
    },
    FETCH_BOARD(context, id) {
      return api.fetchBoard(id).then(data => {
        context.commit('SET_BOARD', data.item)
      })
    }
  }
})

if (localStorage.getItem('token')) {
  store.commit('SET_TOKEN', localStorage.getItem('token'))
  setAuthorizationHeader(localStorage.getItem('token'))
}

export default store