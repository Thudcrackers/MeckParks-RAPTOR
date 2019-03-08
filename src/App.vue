<template>
  <!-- <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div> -->
  <div id="app">
    <link rel="stylesheet" href="//cdn.materialdesignicons.com/2.5.94/css/materialdesignicons.min.css">
    <meckparks-nav></meckparks-nav>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import MeckparksNav from './components/Navbar.vue'
export default {
  created() {
    this.$http.interceptors.response.use(undefined, function(error) {
      return new Promise(function() {
        if (error.status === 401 && error.config && !error.config.__isRetryRequest) {
          this.$store.dispatch('logout')
        }
        throw error
      })
    })
  },
  components: {
    MeckparksNav
  } 
}
</script>


<style lang="scss">
// #app {
//   font-family: 'Avenir', Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }
// #nav {
//   padding: 30px;
//   a {
//     font-weight: bold;
//     color: #2c3e50;
//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
