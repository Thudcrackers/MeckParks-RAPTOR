<template>
    <div class="columns">
        <div class="column">
            <div class="buttons">
                <button class="button" @click="create">New Center</button>
                <button class="button is-primary" :disabled="!selected" @click="show">Details</button>
            </div>
            <b-select v-model="perPage">
                <option value="5">5 per page</option>
                <option value="10">10 per page</option>
                <option value="15">15 per page</option>
                <option value="20">20 per page</option>
            </b-select>
            <b-table striped hover :data="centers" :columns="fields" :selected.sync="selected" :paginated="true" :per-page="perPage" :current-page.sync="currentPage" :order="'isCentered'">
            </b-table>
            <b-modal :active.sync="isCreateModalActive" has-modal-card>
                <create-center :center="center"></create-center>
            </b-modal>
        </div>
    </div>
</template>

<script>
import CreateCenter from '../components/CreateCenter.vue'

export default {
    name: 'centers-list',
    components: {
        CreateCenter
    },
    props: {
        centers: Array
    },
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
        show() {
            var CenterId = this.selected.CenterId
            this.$router.push({name: 'center', params: {CenterId}})
        }
    }
}
</script>

<style>

</style>
