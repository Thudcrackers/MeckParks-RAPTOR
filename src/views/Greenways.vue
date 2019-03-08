<template>
    <div class="columns">
        <div class="column">
            <div class="buttons">
                <button class="button mb-3">New Greenway</button>
                <button class="button is-primary" :disabled="!selected" @click="show(selected)">Details</button>
            </div>
            <b-select v-model="perPage">
                <option value="5">5 per page</option>
                <option value="10">10 per page</option>
                <option value="15">15 per page</option>
                <option value="20">20 per page</option>
            </b-select>
            <b-table striped hover :data="greenways" :columns="fields" :selected.sync="selected" :paginated="true" :per-page="perPage" :current-page.sync="currentPage" :order="'isCentered'">
            </b-table>
            <b-modal :active.sync="isShowModalActive" has-modal-card>
                <greenway-info :greenway="greenway"></greenway-info>
            </b-modal>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import GreenwayInfo from '../components/GreenwayInfo.vue'

export default {
    name: 'greenways',
    components: {
        GreenwayInfo
    },
    mounted() {
        this.$store.dispatch('getGreenways')
    },
    computed: mapState([
        'greenways'
    ]),
    data() {
        return {
            fields: [
                {
                    field: "GreenwayName",
                    label: "Name",
                    width: 160
                },
                {
                    field: "GreenwayDescription",
                    label: "Description"
                }
            ],
            currentPage: 1,
            perPage: 5,
            selected: null,
            isShowModalActive: false,
            greenway: null,
        }
    },
    methods: {
        show(selected) {
            this.axios.get('Greenway/GetGreenwayById/'+selected.GreenwayId)
            .then((res) => {
            if (res.status === 200) {
                    this.greenway = res.data
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
