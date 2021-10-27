<template>
  <section class="details-description">
    <p class="location">{{ space.locationDesc }}</p>
    <h3>The space</h3>
    <p class="space">{{ textToShow }}</p>
    <a class="read-more" @click="isShowAll = !isShowAll">{{ buttonTxt }}</a>
  </section>
</template>

<script>
export default {
  props: {
    space: Object,
  },
  data() {
    return {
      isShowAll: false,
    };
  },
  computed: {
    textToShow() {
      const txt = this.space.spaceDesc;
      if (txt.length > 100 && !this.isShowAll) {
        return txt.substring(0, 100);
      } else return txt;
    },
    buttonTxt() {
      if (!this.isShowAll) {
        return "Read more...";
      } else {
        return "Read Less...";
      }
    },
  },
};
</script>

<style>
</style>