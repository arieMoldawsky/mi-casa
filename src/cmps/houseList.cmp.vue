<template>
    <section class="house-list flex f-center wrap">
            <housePreview v-for="house in houses" :key="house.id" :house="house" @click.native="showDetails(house._id)"/>
    </section>
</template>

<script>
import housePreview from "@/cmps/housePreview.cmp.vue";

export default {
    props: {
        houses: Array,
    },
    components:{
        housePreview
    },
    methods:{
        showDetails(houseId){
            this.$router.push(`/house/${houseId}`)
        }
    }
};
</script>
