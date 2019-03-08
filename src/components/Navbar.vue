<template>
<nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="container">
        <div class="navbar-brand">
            <router-link to="/" class="navbar-item">
                <span><fa icon="tree"/> RAPTR</span>
            </router-link>
            <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarMenu">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>

        <div id="navbarMenu" class="navbar-menu">
            <div class="navbar-start">
                <router-link to="/centers" class="navbar-item">Centers</router-link>
                <router-link to="/greenways" class="navbar-item">Greenways</router-link>
            </div>

            <div class="navbar-end">
                <router-link to="/login" class="navbar-item" v-if="!isLoggedIn">Login</router-link>
                <router-link to="/" class="navbar-item" v-if="isLoggedIn"><span v-if="isLoggedIn"><a @click="logout">Logout</a></span></router-link>
            </div>
        </div>
    </div>
</nav>
</template>

<script>
export default {
    computed: {
        isLoggedIn() {
            return this.$store.getters.isLoggedIn
        }
    },
    methods: {
        logout() {
            this.$store.dispatch('logout')
            .then(() => {
                this.$router.push('/login')
            })
        }
    }
}
</script>

<style>
nav {
    margin-bottom: 15px;
}
</style>
