import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const resourceHost = 'api/user'

const enhanceAccessToeken = () => {
  const {accessToken} = localStorage
  if (!accessToken) return
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
}
enhanceAccessToeken()

export default new Vuex.Store({
  state: {
    accessToken: null,
    login: null
  },
  getters: {
    isAuthenticated (state) {
      state.accessToken = state.accessToken || localStorage.accessToken
      return state.accessToken
    },
    getLogin (state) {
      state.login = state.login || localStorage.login
      return state.login
    }
  },
  mutations: {
    getlogin (state) {
      return state.login
    },
    setlogin (state, payload) {
      state.login = payload
    },
    LOGIN (state, payload) {
      state.login = payload.login
      state.accessToken = payload.accessToken
      localStorage.login = payload.login
      localStorage.accessToken = payload.accessToken
    },
    LOGOUT (state) {
      state.accessToken = null
      state.login = null
      delete localStorage.accessToken
      delete localStorage.login
    }
  },
  actions: {
    LOGIN ({commit}, {uid, upw}) {
      return axios.post(`${resourceHost}/login`, {uid, upw})
        .then(({data}) => {
          let payload = {login: uid, accessToken: data.accessToken}
          commit('LOGIN', payload)
          axios.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`
        })
    },
    LOGOUT ({commit}) {
      axios.defaults.headers.common['Authorization'] = undefined
      commit('LOGOUT')
    }
  }
})
