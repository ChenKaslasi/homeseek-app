<template>
  <section class="review-container details-conatiner">
    <div class="card-container-reviews">
      <ul class="cards" v-for="review in reviews" :key="review.id">
        <li class="review-card">
          <div class="card-header">
            <img :src="review.by.img" />
            <div class="header-txt">
              <p class="reviewer-name">{{ review.by.name }}</p>
              <p class="reviewer-date">{{ dateForDisplay(review) }}</p>
            </div>
          </div>
          <p class="review-txt">{{ review.txt }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    reviews: Array,
  },
  methods: {
    dateForDisplay(review) {
      return moment(review.date).format('MMMM YYYY')
    }
  },
  // computed: {
    // dateForDisplay() {
      // var dateObj = new Date();
      // var month = dateObj.getUTCMonth() + 1; //months from 1-12
      // var day = dateObj.getUTCDate();
      // var year = dateObj.getUTCFullYear();

      // var newdate = year + "/" + month + "/" + day;
      // return newdate;
      // return moment().format('MMMM YYYY')
    // },
  // },
}
</script>

<style lang="scss" scoped>
</style>