<template>
    <section class="house-details-section">
        <h2>House Details:</h2>
        <div>{{ house.name }}</div>
        <div>(claculate rating) - {{house.location}}</div>
        <div class="imgs-container">
            <div class="main-img">
                <img :src="mainImg" alt="">
            </div>
            <img v-for="(img, idx) in house.imgs" :key="img" :src="house.imgs[idx + 1]" alt="">
        </div>
    </section>
</template>



<script>
// import chatApp from "@/components/chat-app"

export default {
    data() {
        return {
            house: {},
            mainImg: ''
        };
    },
    methods: {
        backToList() {
            this.$router.push(`/`);
        },
        async onUploadImg(ev) {
            const res = await uploadImg(ev);
            console.log(res.url);
            this.house.imgUrl = res.url;
            this.$store.dispatch({
                type: "saveHouse",
                house: this.house
            })
        },
        async loadHouse(houseId) {
            const house = await this.$store.dispatch({
                type: "loadHouse",
                houseId
            })
            this.house = house;
            this.mainImg = house.imgs[0];
        }
    },
    computed: {
        // convertTime() {
        //     return new Date(this.house.createdAt).toLocaleDateString("he");
        // },
        convertBoolean() {
            if (this.house.inStock) return "Yes!";
            return "No..";
        },

    },
    created() {
        const houseId = this.$route.params.id;
        console.log(houseId);
        this.loadHouse(houseId);
    },
    components: {
        // chatApp,
    }
};
</script>
