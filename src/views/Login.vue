<template>
    <section class="container">
        <link rel="stylesheet" href="//cdn.materialdesignicons.com/2.5.94/css/materialdesignicons.min.css">
        <div class="columns">
            <div class="column"></div>
            <div class="column">
                <form class="login" @submit.prevent="login">
                    <div class="field" description="Let us know your Email." label-for="username">
                        <label class="label">Email</label>
                        <input class="input" id="username" v-model="email" type="email" required>
                        <p class="help">Enter your email</p>
                    </div>
                    <div class="field" description="Let us know your Password." label-for="pw">
                        <label class="label">Password</label>
                        <input class="input" id="password" v-model="password" type="password">
                        <p class="help">Enter your password</p>
                    </div>
                    <div class="buttons">
                        <button class="button is-primary is-outlined" @click.prevent="login">Login</button>
                    </div>
                </form>
            </div>
            <div class="column"></div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'login',
    data() {
        return {
            email: "",
            password: ""
        }
    },
    methods: {
        login() {
            let username = this.email
            let password = this.password
            try {
                this.$store.dispatch('login', {username, password})
                .then(() => this.$router.push('/'))
                .catch(error => this.$console.log(error))
            } catch(error) {
                this.$toasted.error(error)
                this.$console.log(error)
            }
        },
    }
}
</script>

<style>

</style>
