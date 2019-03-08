<template>
    <form action="" v-if="center">
        <div class="modal-card">
            <header class="modal-card-head">
                <b-field>
                    <b-input size="is-large" type="text" :value="center.Name" v-model="center.Name"></b-input>
                </b-field>
            </header>
            <section class="modal-card-body">
                <b-field label="Address">
                    <b-input type="text" :value="center.Address1" v-model="center.Address1"></b-input>
                </b-field>
                <b-field label="City">
                    <b-input type="text" :value="center.City" v-model="center.City"></b-input>
                </b-field>
                <b-field label="State">
                    <b-input type="text" :value="center.State" v-model="center.State"></b-input>
                </b-field>
                <b-field label="Phone">
                    <b-input type="text" :value="center.Phone" v-model="center.Phone"></b-input>
                </b-field>
                <b-field label="Notes">
                    <b-input type="textarea" :value="center.Notes" v-model="center.Notes"></b-input>
                </b-field>
                <b-field label="Description">
                    <b-input type="textarea" :value="center.Description" v-model="center.Description"></b-input>
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
    name: 'create-center',
    props: ['center'],
    methods: {
        update() {
            this.$store.dispatch('createCenter', this.center)
        }
    }
}
</script>

<style>

</style>
