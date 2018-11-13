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
    name: null,
    accessToken: null
  },
  getters: {
    isAuthenticated (state) {
      state.accessToken = state.accessToken || localStorage.accessToken
      return state.accessToken
    },
    getName (state) {
      state.name = state.name || localStorage.name
      return state.name
    }
  },
  mutations: {
    LOGIN (state, payload) {
      state.name = payload.name
      state.accessToken = payload.accessToken
      localStorage.name = payload.name
      localStorage.accessToken = payload.accessToken
    },
    LOGOUT (state) {
      state.accessToken = null
      state.name = null
      delete localStorage.accessToken
      delete localStorage.name
    }
  },
  actions: {
    LOGIN ({commit}, {uid, upw}) {
      return axios.post(`${resourceHost}/login`, {uid, upw})
        .then(({data}) => {
          let payload = {name: data.name, accessToken: data.accessToken}
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
