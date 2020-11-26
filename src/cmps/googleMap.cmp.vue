
<template>
    <section v-if="location.lat" class="googleMap-section">
        <h2>location</h2>
        <GmapMap
            :center="mapPos"
            :zoom="14"
            map-type-id="terrain"
            style="width: 100%; height: 500px"
        >
            <GmapMarker
                :key="index"
                v-for="(m, index) in markers"
                :position="m.position"
                :clickable="true"
                :draggable="true"
                @click="center = m.position"
            />
        </GmapMap>
    </section>
</template>



<script>
import { log } from 'util';
export default {
    props: {
        location: Object
    },
    data() {
        return {
            markers: [
               { position: { lat: +this.location.lat, lng: +this.location.lng }},
                ],
            mapPos: { lat: +this.location.lat, lng: +this.location.lng }
        };
    },
    methods: {
        goTo(branch) {
            if(branch === 'haifa') this.mapPos = { lat: 32.817280, lng: 34.988762 };
            else if(branch === 'ramat-gan') this.mapPos = { lat: 32.083550, lng: 34.815500 };
            else this.mapPos = { lat: 32.049230, lng: 34.874960 };
        }
    },
    computed: {
    },
    created() {
        console.log(this.location);
    }
};
</script>

<style lang="css" scoped>
</style>
