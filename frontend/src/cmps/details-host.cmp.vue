<template>
  <section class="host-container">
    <section class="top">
      <div class="thumbnail">
        <img :src="space.host.profileImg" />
      </div>
      <span class="title">{{ `Hosted by ${space.host.name}` }}</span>
      <!-- Todo : add host joined date to db -->
      <!-- <span class="info">{{`Joined in ${space}`}}</span> -->
      <span class="info">{{ `Joined in March 2013` }}</span>
    </section>

    <section v-if="space.reviewScores" class="content flex">
      <section class="left">
        <div class="icons flex">
          <div class="reviews flex">
            <span class="star">󰀄</span>
            <span> {{ `${space.reviews.length} Reviews` }} </span>
          </div>
          <div class="identity flex">
            <img src="../assets/icons/verified.svg" />
            <span>Identity verified</span>
          </div>
        </div>
        <div class="text">
          <span>{{ space.host.about }}</span>
        </div>
      </section>

      <section class="right flex column">
        <span class="rate">Response rate: {{ space.host.responseRate}}%</span>
        <span class="time">Response time: {{ space.host.responseTime }}</span>
      </section>
    </section>
  </section>
</template>

<script>
export default {
  props: {
    space: Object,
  },
};
</script>

<style>
</style>