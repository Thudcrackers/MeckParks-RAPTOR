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
    center: {},
    amenities: [],
    amenity: {},
    amenityTypes: [],
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

    SET_CENTER(state, center) {
      state.center = center
      state.center.amenities = []
      state.amenities.forEach(amenity => {
        if (amenity.Center === state.center.CenterId) {
          center.amenities.push(amenity)
        }
      });
    },

    SET_AMENITIES(state, amenities) {
      state.amenities = amenities

      state.amenities.forEach(amenity => {
        amenity.amenityType = {}
        state.amenityTypes.forEach(amenityType => {
          if (amenity.AmenityTypeId === amenityType.Amenity.AmenityTypeId) {
            amenity.amenityType = amenityType
          }
        })
      })

      state.centers.forEach(center => {
        center.amenities = []
        state.amenities.forEach(amenity => {
          if (amenity.Center === center.CenterId) {
            center.amenities.push(amenity)
          }
        });
      });
    },

    SET_AMENITY(state, amenity) {
      state.amenity = amenity
      state.amenity.amenityType = {}

      state.amenityTypes.forEach(amenityType => {
        if (state.amenity.AmenityTypeId === amenityType.Amenity.AmenityTypeId) {
          state.amenity.amenityType = amenityType
        }
      });
    },

    SET_AMENITY_TYPES(state, amenityTypes) {
      state.amenityTypes = amenityTypes
    },

    SET_GREENWAYS(state, greenways) {
      state.greenways = greenways
    }
  },
  actions: {
    async login({commit}, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        var reqToast = Vue.toasted.show("Logging in...")

        axios.post('MeckAuth/Login', {username: user.username, password: user.password})
        .then(res => {
          const token = "MeckAuth " + res.data.AccessToken
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

    async getAmenities({commit}) {
      await axios.get('Amenity/GetAmenitiesAll')
      .then((res) => {
        if (res.status === 200) {
          commit('SET_AMENITIES', res.data)
        }
      })
    },

    async getAmenityTypes({commit, dispatch}) {
      await axios.get('Amenity/GetAmenitiesTypesAll')
      .then((res) => {
        if (res.status === 200) {
          commit('SET_AMENITY_TYPES', res.data)
          dispatch('getAmenities')
        }
      })
    },

    async getCenters({commit, dispatch}) {
      await axios.get('Center/GetCentersAll')
      .then((res) => {
        if (res.status === 200) {
          commit('SET_CENTERS', res.data)
          dispatch('getAmenityTypes')
        }
      })
    },

    async getCenterById({commit, dispatch}, id) {
      await axios.get('Center/GetCenterById/'+id)
      .then((res) => {
        if (res.status === 200) {
          dispatch('getAmenityTypes')
          commit('SET_CENTER', res.data.Center)
        }
      })
    },

    async updateCenter({dispatch}, center) {
      await axios.put('Center/UpdateCenter', center)
      .then((res) => {
        if (res.status === 200) {
          dispatch('getCenters')
        }
      })
    },

    async createCenter({dispatch}, center) {
      await axios.post('Center/CreateCenter', center)
      .then((res) => {
        if (res.status === 200) {
          dispatch('getCenters')
        }
      })
    },
    
    async deleteCenter({dispatch}, center) {
      await axios.delete('Center/DeleteCenter/' + center.CenterId, {data: center})
      .then((res) => {
        if (res.status === 200) {
          dispatch('getCenters')
          Vue.toasted.show("Center Deleted").goAway(1200)
        }
      })
    },

    async getGreenways({commit}) {
      await axios.get('Greenway/GetGreenwaysAll')
      .then((res) => {
        if (res.status === 200) {
          commit('SET_GREENWAYS', res.data)
        }
      })
    },

    async updateGreenway({dispatch}, greenway) {
      await axios.post('Greenway/UpdateGreenway', greenway)
      .then((res) => {
        if (res.status === 200) {
          dispatch('getGreenways')
        }
      })
    }
  },

  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status
  }
})
