<template>
    <section class="house-list">
        <housePreview v-for="house in houses" :key="house._id" :house="house"/>
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
};
</script>
