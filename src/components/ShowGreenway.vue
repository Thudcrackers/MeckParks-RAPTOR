<template>
    <form action="" v-if="greenway">
        <div class="modal-card">
            <header class="modal-card-head">
                <b-field>
                    <b-input size="is-large" type="text" :value="greenway.GreenwayName" v-model="greenway.GreenwayName"></b-input>
                </b-field>
            </header>
            <section class="modal-card-body">
                <b-field label="Description">
                    <b-input type="textarea" :value="greenway.GreenwayDescription" v-model="greenway.GreenwayDescription"></b-input>
                </b-field>
            </section>
            <footer class="modal-card-foot">
                <button class="button is-primary" @click="update">Save</button>
                <button class="button is-danger" @click="$parent.close()">Cancel</button>
            </footer>
        </div>
    </form>
</template>

<script>
export default {
    name: 'greenway-info',
    props: ['greenway'],
    methods: {
        update() {
            this.$store.dispatch('updateGreenway', this.greenway)
        }
    }
}
</script>

<style>

</style>
