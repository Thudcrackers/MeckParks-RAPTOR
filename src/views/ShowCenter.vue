<template>
    <form action="">
        <div>
            <button class="button is-primary is-outlined" style="margin-bottom:15px" @click.prevent="$router.go(-1)">Back</button>
            <header>
                <b-field>
                    <b-input size="is-large" type="text" :value="center.Name" v-model="center.Name"></b-input>
                </b-field>
            </header>
            <section>
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
                    <b-input type="textarea" :value="center.Notes" v-model="center.Notes" placeholder="No Notes"></b-input>
                </b-field>
                <b-field label="Description">
                    <b-input type="textarea" :value="center.Description" v-model="center.Description" placeholder="No Description"></b-input>
                </b-field>
                <span v-if="center.amenities.length > 0">
                    <b-field label="Amenities"></b-field>
                    <div class="buttons">
                        <button class="button" >New Amenity</button>
                        <button class="button is-primary" :disabled="!selected" @click.prevent="showAmenity">Edit Amenity</button>
                    </div>
                    <b-table striped hover :data="center.amenities" :columns="fields" :selected.sync="selected"></b-table>
                </span>
            </section>
            <footer class="modal-card-foot">
                <button class="button is-primary" @click="update">Save</button>
                <button class="button is-primary is-outlined" @click.prevent="$router.go(-1)">Cancel</button>
                <button class="button is-danger" style="float:right" @click.prevent="destroy">Delete Center</button>
            </footer>
        </div>
    </form>
</template>

<script>
import {mapState} from 'vuex'

export default {
    name: 'center',
    mounted() {
        var id = this.$route.params.CenterId
        this.$store.dispatch('getCenterById', id)
    },
    computed: mapState(['center', 'amenities']),
    data() {
        return {
            selected: null,
            fields: [
                {
                    field: "Name",
                    label: "Name"
                },
                {
                    field: "Description",
                    label: "Description"
                },
                {
                    field: "amenityType.Amenity.Name",
                    label: "Type"
                }
            ]
        }
    },
    methods: {
        update() {
            this.$store.dispatch('updateCenter', this.center)
            this.$emit('back')
        },
        destroy() {
            if(confirm("This will PERMANENTLY delete this center. Are you sure you want to do this?")) {
                this.$store.dispatch('deleteCenter', this.center)
                this.$emit('back')
            } else {
                this.$toasted.success("Center Spared").goAway(1200)
            }
        },
        showAmenity() {
            var AmenityId = this.selected.AmenityId
            this.$router.push({name: 'amenity', params: {AmenityId}})
        }
    }
}
</script>

<style>

</style>
