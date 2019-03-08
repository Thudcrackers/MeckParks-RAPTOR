<template>
    <div class="columns">
        <div class="column">
            <div class="buttons">
                <button class="button mb-3" @click="create">New Center</button>
                <button class="button is-primary" :disabled="!selected" @click="show(selected)">Details</button>
            </div>
            <b-select v-model="perPage">
                <option value="5">5 per page</option>
                <option value="10">10 per page</option>
                <option value="15">15 per page</option>
                <option value="20">20 per page</option>
            </b-select>
            <b-table striped hover :data="centers" :columns="fields" :selected.sync="selected" :paginated="true" :per-page="perPage" :current-page.sync="currentPage" :order="'isCentered'">
            </b-table>
            <b-modal :active.sync="isShowModalActive" has-modal-card>
                <center-info :center="center" :AmenityList="AmenityList" :AmenityTypes="AmenityTypes"></center-info>
            </b-modal>
            <b-modal :active.sync="isCreateModalActive" has-modal-card>
                <create-center :center="center"></create-center>
            </b-modal>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import CenterInfo from '../components/CenterInfo.vue'
import CreateCenter from '../components/CreateCenter.vue'

export default {
    name: 'centers',
    components: {
        CenterInfo,
        CreateCenter
    },
    mounted() {
        this.$store.dispatch('getCenters')
    },
    computed: mapState([
        'centers'
    ]),
    data() {
        return {
            fields: [
                {
                    field: "Name",
                    label: "Name"
                },
                {
                    field: "Address1",
                    label: "Address"
                },
                {
                    field: "City",
                    label: "City"
                },
                {
                    field: "State",
                    label: "State"
                },
                {
                    field: "Phone",
                    label: "Phone"
                },
                {
                    field: "Description",
                    label: "Description"
                }
            ],
            currentPage: 1,
            perPage: 5,
            selected: null,
            isShowModalActive: false,
            isCreateModalActive: false,
            center: null,
            newCenter: {},
            AmenityList: [],
            AmenityTypes: []
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
            this.axios.get('Center/GetCenterById/'+selected.CenterId)
            .then((res) => {
            if (res.status === 200) {
                    this.center = res.data.Center
                }
            })
            this.axios.get('Amenity/GetAmenityByCenterId/'+selected.CenterId)
            .then((res) => {
                if (res.status === 200) {
                    this.AmenityList = res.data.AmenityList
                }
            })
            this.axios.get('Amenity/GetAmenitiesTypesAll')
            .then((res) => {
                if (res.status === 200) {
                    this.AmenityTypes = res.data
                }
            })
            this.isShowModalActive = true
        },
        edit(row) {
            this.console.log(row)
        },
        destroy() {
            this.console.log("Destroy not implemented")
        },
    }
}
</script>

<style>

</style>
