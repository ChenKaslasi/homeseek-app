<template>
  <section class="gallery-container" v-if="space">
    <div class="top">
      <h1 class="title">{{space.name}}</h1>
      <div class="info">
        <div v-if="space.reviewScores" class="reviews-summery">
          <span class="star">󰀄</span>
          <span  class="rating" >{{ratingForDisplay}}</span> 
          <span class=""> {{`(${space.reviews.length})`}} </span>
        </div>
        <div class="super-host" >
          <span class="super">󰀃</span>
          <span>Superhost</span>
        </div>
      <router-link class="cityLink" to="/">{{space.address.street}}</router-link>
      </div>
    </div>
    <div class="gallery-grid " >
      <div class="img1 ratio-square">
      <img :src="space.imgs[0]" >
      </div>
      <div class="img2 ratio-square" >
      <img :src="space.imgs[1]" >
      </div>
      <div class="img3 ratio-square" >
      <img  :src="space.imgs[2]" >
      </div>
      <div class="img4 ratio-square" >
      <img  :src="space.imgs[3]" >
      </div>
      <div class="img5 ratio-square" >
      <img  :src="space.imgs[4]" >
      </div>
    </div>
  </section>
</template>

<script>
export default {
props: {
    space: Object,
  },
  computed:{
    ratingForDisplay(){
      return (this.space.reviewScores.rating)/20
    }
  }
}
</script>
  
<style>

</style>