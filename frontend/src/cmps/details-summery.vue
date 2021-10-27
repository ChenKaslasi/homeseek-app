<template>
  <section class="details-summery" v-if="space">
      <span class="title">{{ `${space.roomType} hosted by ${space.host.name}` }}</span>
      <span class="info">{{`${space.capacity} guests · ${space.spaceType} · ${space.beds} bed · ${space.bathrooms} bath`}}</span>
    <div class="thumbnail">
      <img :src="space.host.profileImg"  v-scroll-to="'#detailsHost'"  @click="emitHostClick"/>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    space: Object,
  },
  methods:{
    emitHostClick(){
      this.$emit('scroll')
    }
  }
};
</script>

<style>
</style>