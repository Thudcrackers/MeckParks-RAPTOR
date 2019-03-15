<template>
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
import Vue from 'vue'
import Buefy from 'buefy'
Vue.use(Buefy)

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
// Import Bulma's core
@import "~bulma/sass/utilities/_all";

$buefy: #8c67ef;
// Set your colors
$primary: $buefy;
$primary-invert: findColorInvert($primary);
$twitter: #4099FF;
$twitter-invert: findColorInvert($twitter);

// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$colors: (
    "white": ($white, $black),
    "black": ($black, $white),
    "light": ($light, $light-invert),
    "dark": ($dark, $dark-invert),
    "primary": ($primary, $primary-invert),
    "info": ($info, $info-invert),
    "success": ($success, $success-invert),
    "warning": ($warning, $warning-invert),
    "danger": ($danger, $danger-invert),
    "twitter": ($twitter, $twitter-invert)
);

// Links
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";
</style>
