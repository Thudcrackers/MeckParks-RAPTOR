<template>
    <div class="columns">
        <div class="column">

        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    mounted() {
        this.$store.dispatch('showCenter')
    },
    computed: mapState([
        'center'
    ])
}
</script>

<style>

</style>
