<template>
  <section class="amenity-container">
    <h1 class="title">Amenities</h1>
    <div class="box">
      <ul class="amenity-list" v-for="(amenity, idx) in space.amenities" :key="idx">
        <li v-if="idx<12" class="amenity">
          <img :src="require(`../assets/icons/${amenity}.svg`)" />
          <span>{{ amenity }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    space: Object,
  },
  computed: {
    
  }
};
</script>
  
<style>
</style>