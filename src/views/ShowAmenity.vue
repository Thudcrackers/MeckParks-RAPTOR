<template>
    <form action="" v-if="amenity">
        <div>
            <button class="button is-primary is-outlined" style="margin-bottom:15px" @click.prevent="$router.go(-1)">Back</button>
            <header>
                <b-field label="Type">
                    <b-input size="is-large" type="text" :value="amenity.amenityType"></b-input>
                </b-field>
            </header>
            <section>
                <b-field label="Name">
                    <b-input type="text" :value="amenity.Name" v-model="amenity.Name"></b-input>
                </b-field>
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
    name: 'show-amenity',
    async mounted() {
        var id = this.$route.params.AmenityId
        // this.$store.dispatch('getAmenityById', id)
        await this.axios.get('Amenity/GetAmenityById/'+id)
        .then((res) => {
            if (res.status === 200) {
                this.amenity = res.data
            }
        })
        await this.axios.get('Amenity/GetAmenitiesTypesAll')
        .then((res) => {
            if (res.status === 200) {
                this.amenityTypes = res.data
            }
        })

        this.amenity.amenityType = {}
        this.amenityTypes.forEach(amenityType => {
            if (amenityType.Amenity.AmenityTypeId === this.amenity.AmenityTypeId) {
                this.amenity.amenityType = amenityType.Amenity.Name
            }
        });
    },
    data() {
        return {
            amenity: {},
            amenityTypes: []
        }
    },
    // computed: mapState(['amenityTypes']),
    methods: {
        update() {
            console.log("Update clicked")
        },
        destroy() {
            console.log("Destroy clicked")
        }
    }
}
</script>

<style>

</style>
