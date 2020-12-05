
<template>
    <section v-if="location.lat" class="googleMap-section">
        <h2>Location</h2>
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
};
</script>

<style lang="css" scoped>
</style>
