<template>
  <section class="space-preview card">
    <div class="ratio-list">
      <el-carousel
        v-if="isNormal"
        class="carousel"
        trigger="click"
        :autoplay="false"
      >
        <el-carousel-item v-for="(img, idx) in space.imgs" :key="idx">
          <img :src="img" />
        </el-carousel-item>
      </el-carousel>
      <el-carousel
        v-if="isNarrow"
        class="carousel"
        trigger="click"
        :autoplay="false"
        arrow="always"
      >
        <el-carousel-item v-for="(img, idx) in space.imgs" :key="idx">
          <img :src="img" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div>
      <div v-if="space.reviewScores">
        <span class="star">󰀄</span> {{ spaceRate }}
        <span class="reviews-count">({{ numOfReviewers }})</span>
      </div>
      <div class="txt-container">
        <div v-if="space.roomType">
          {{ space.roomType }} · {{ space.address.city }}
        </div>
        <div>{{ spaceName }}</div>
      </div>
      <div>
        <span class="price">${{ space.price }}</span> / night
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isNarrow: false,
      isNormal: false,
    };
  },
  props: {
    space: Object,
  },
  computed: {
    spaceName() {
      const txt = this.space.name;
      if (txt.length > 30) {
        return txt.substring(0, 27) + "...";
      } else return txt;
    },
    spaceRate() {
      return this.space.reviewScores.rating / 20;
    },
    numOfReviewers() {
      return this.space.reviews.length;
    },
  },
  created() {
    this.handleResize();
  },
  methods: {
    handleResize() {
      if (window.innerWidth < 700) {
        this.isNarrow = true;
        this.isNormal = false;
      }
      if (window.innerWidth > 700) {
        this.isNarrow = false;
        this.isNormal = true;
      }
    },
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>