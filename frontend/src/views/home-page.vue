<template>
  <div class="home main-layout">
    <space-header />
    <div class="hero full main-layout">
      <space-filter @filter="setFilter" />
      <div class="h1-container">
        <h1 class="hero-header">Live</h1>
        <h1 class="hero-header2">Anywhere<span>.</span></h1>
      </div>
    </div>

    <div class="home-container">
      <h2 class="location-header">Explore locations</h2>

      <div class="card-container">
        <carousel>
        <div class="card" v-for="(img, idx) in imgs" :key="idx" @click="bookLocation(img.title)">
          <slide>
            <img :src="img.url" />
            <h3>{{ img.title }}</h3>
           </slide>
        </div>
        </carousel>
      </div>
    </div>
    <about-us />
    <home-banner />
    <space-footer/>
  </div>
</template>

<script>
import spaceFilter from "../cmps/space-filter.cmp.vue";
import aboutUs from "../cmps/about-us.cmp.vue";
import homeBanner from "../cmps/home-banner.cmp.vue";
import spaceHeader from "@/cmps/space-header.cmp.vue";
import spaceFooter from "@/cmps/space-footer.cmp.vue";
import { Carousel, Slide } from 'vue-carousel';
// @ is an alias to /src

export default {
  name: "Home",
  components: {
    spaceFilter,
    spaceHeader,
    aboutUs,
    homeBanner,
    Carousel,
    Slide,
    spaceFooter
  },
  data() {
    return {
      imgs: [
        {
          title: "Barcelona",
          url: "https://wallpaperaccess.com/full/1471128.jpg",
        },
        {
          title: "New York",
          url:
            "https://www.nyhabitat.com/blog/wp-content/uploads/2014/12/Top-5-sunset-spots-nyc-empire-state-skyline.jpg",
        },
        {
          title: "Sydney",
          url:
            "https://hdwallpaperim.com/wp-content/uploads/2017/09/16/51093-cityscape-Sydney-Sydney_Opera_House-night-Australia.jpg",
        },
      ],
    };
  },
  methods: {
    setFilter(filterBy) {
      this.$router.push(`/${filterBy}`);
    },
    bookLocation(title) {
      this.$router.push({ path: "/city", query: { city: title } });
    },
  },
};
</script>
<style lang="scss">
</style>