<template>
  <section class="map-container" v-if="space">
    <GmapMap
      :center="{
        lng: this.space.address.coordinates.lng,
        lat: this.space.address.coordinates.lat,
      }"
      :zoom="14"
      map-type-id="terrain"
      style="height: 400px"
    >
      <gmap-custom-marker
        v-for="(m, index) in markers"
        :key="index"
        :position="m.position"
        :marker="{
          lng: markers[index].position.lng,
          lat: markers[index].position.lat,
        }"
        alignment="bottomright"
      >
        <img
          class="marker-img"
          src="https://www.svgrepo.com/show/22031/home-icon-silhouette.svg"
        />
      </gmap-custom-marker>
    </GmapMap>
  </section>
</template>

<script>
// import mapMarker from '../cmps/map-marker.cmp.vue'
import GmapCustomMarker from "vue2-gmap-custom-marker";
// import moFo from '../assets/icons/bed.svg'
export default {
  components: {
    "gmap-custom-marker": GmapCustomMarker,
    // mapMarker,
  },
  props: {
    space: Object,
  },
  data() {
    return {
      markers: [
        {
          position: {
            lat: this.space.address.coordinates.lat,
            lng: this.space.address.coordinates.lng,
          },
        },
      ],
    };
  },
};
</script>

<style>
.marker-img {
  width: 30px;
  height: 30px;
}
</style>