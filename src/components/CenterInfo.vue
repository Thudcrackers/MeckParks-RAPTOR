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
                    <b-input type="textarea" :value="center.Notes" v-model="center.Notes" placeholder="No Notes"></b-input>
                </b-field>
                <b-field label="Description">
                    <b-input type="textarea" :value="center.Description" v-model="center.Description" placeholder="No Description"></b-input>
                </b-field>
                <span v-if="amenities">
                    <b-field label="Amenities"></b-field>
                    <b-table :data.sync="amenities" :columns="fields"></b-table>
                </span>
            </section>
            <footer class="modal-card-foot">
                <button class="button is-primary" @click="update">Save</button>
                <button class="button is-primary is-outlined" @click="$parent.close()">Cancel</button>
                <button class="button is-danger" style="float:right" @click="destroy">Delete Center</button>
            </footer>
        </div>
    </form>
</template>

<script>
export default {
    name: 'center-info',
    props: ['center', 'AmenityList', 'AmenityTypes'],
    mounted() {
        setTimeout(() => {
            this.AmenityList.forEach(amenity => {
                this.AmenityTypes.forEach(amenityType => {
                    if (amenity.AmenityTypeId === amenityType.Amenity.AmenityTypeId)
                        this.amenities.push({
                            "Name": amenity.Name,
                            "Description": amenity.Description,
                            "Type": amenityType.Amenity.Name
                        })
                });
            });
        }, 200)
    },
    data() {
        return {
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
                    field: "Type",
                    label: "Type"
                }
            ],
            amenities: []
        }
    },
    methods: {
        update() {
            this.$store.dispatch('updateCenter', this.center)
            this.$parent.close()
        },
        destroy() {
            if(confirm("This will PERMANENTLY delete this center. Are you sure you want to do this?")) {
                this.$store.dispatch('deleteCenter', this.center)
                this.$parent.close()
            } else {
                this.$toasted.success("Center Spared")
            }
        }
    }
}
</script>

<style>

</style>
