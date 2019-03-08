import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Toasted from 'vue-toasted'

Vue.use(Vuex)
Vue.use(Toasted)
Vue.use(VueAxios, axios)
Vue.axios.defaults.baseURL = "https://meck-sus-meck-parks-tst.azurewebsites.net/api"

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user: {},
    centers: [],
    greenways: []
  },
  mutations: {
    auth_request(state) {
      state.status = 'loading'
    },

    auth_success(state, token, user) {
      state.status = 'success'
      state.token = token
      state.user = user
    },

    auth_error(state) {
      state.status = 'error'
    },

    logout(state) {
      state.status = ''
      state.token = ''
    },

    SET_CENTERS(state, centers) {
      state.centers = centers
    },

    SET_GREENWAYS(state, greenways) {
      state.greenways = greenways
    }
  },
  actions: {
    login({commit}, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        var reqToast = Vue.toasted.show("Logging in...")

        axios.post('MeckAuth/Login', {username: user.username, password: user.password})
        .then(res => {
          const token = "MeckAuth " + res.data.AccessToken
          // const user = user
          localStorage.setItem('user', user.username)
          localStorage.setItem('token', token)
          axios.defaults.headers.common['Authorization'] = token
          commit('auth_success', token, user)
          reqToast.goAway(0)
          resolve(res)
        })
        .catch(error => {
          commit('auth_error')
          localStorage.removeItem('token')
          reject(error)
          reqToast.goAway(0)
          Vue.toasted.error("Invalid username or password").goAway(2000)
        })
      })
    },

    logout({commit}) {
      return new Promise((resolve) => {
        commit('logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    },

    async getCenters({commit}) {
      await axios.get('Center/GetCentersAll', {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json;charset=utf-8;v=1.0",
          "Ocp-Apim-Subscription-Key": "b685b4a07a274f5db69aaf06c32f6fae"
        }
      })
      .then((res) => {
        if (res.status === 200) {
          commit('SET_CENTERS', res.data)
        }
      })
    },

    updateCenter({dispatch}, center) {
      axios.put('Center/UpdateCenter', {
        data: center
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch('getCenters')
        }
      })
    },

    createCenter({dispatch}, center) {
      axios.post('Center/CreateCenter', center)
      .then((res) => {
        if (res.status === 200) {
          dispatch('getCenters')
        }
      })
    },

    async getGreenways({commit}) {
      await axios.get('Greenway/GetGreenwaysAll', {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json;charset=utf-8;v=1.0",
          "Ocp-Apim-Subscription-Key": "b685b4a07a274f5db69aaf06c32f6fae"
        }
      })
      .then((res) => {
        if (res.status === 200) {
          commit('SET_GREENWAYS', res.data)
        }
      })
    }
  },

  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status
  }
})
