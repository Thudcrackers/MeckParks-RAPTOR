<template>
    <div>
        <centers-list v-if="page=='list'" :centers="centers" @show="show($event)"></centers-list>
        <show-center v-if="page=='show'" :center="center" @back="page='list'" @editAmenity="editAmenity($event)"></show-center>
        <show-amenity v-if="page=='amenity'" :amenity="amenity" @back="page='list'"></show-amenity>
    </div>
</template>

<script>
import {mapState} from 'vuex'

import CentersList from '../components/CentersList.vue'

export default {
    name: 'centers',
    components: {
        CentersList
    },
    mounted() {
        this.$store.dispatch('getCenters')
    },
    computed: mapState([
        'centers'
    ]),
    data() {
        return {
            page: "list",
            center: null,
            amenity: null
        }
    },
    methods: {
        create() {
            this.isCreateModalActive = true
            this.center = {
                "Name": "", "Address1": "", "City": "", "State": "", "Phone": "", "Notes": "", "Description": "",
                "SiteId": 1, "Latitude": "", "Longitude": "", "Distance": null, "ActiveNetId": 1, "IsActive": true,
                "AmenityCount": 0, "AlertTitle": null, "AlertDescription": null, "AlertStart": null, "AlertExpire": null,
                "WorkerId": localStorage.getItem('user'), "CreatedDate": "", "UpdatedDate": ""
            }
        },
        show(selected) {
            this.center = selected
            this.page = "show"
        },
        editAmenity(amenity) {
            this.amenity = amenity
            this.page = "amenity"
        }
    }
}
</script>

<style>

</style>
