<template>
  <div class="narrow-footer-container">
    <div class="content-container" v-if="space">
      <div class="rating-price">
        <div class="price">
          <h3 class="price">${{ space.price }}<span> / night</span></h3>
        </div>
        <div v-if="space.reviewScores">
          <span class="star">󰀄</span>
          <span class="rating">{{ ratingForDisplay }}</span>
          <span class=""> {{ `(${space.reviews.length})` }} </span>
        </div>
      </div>
      <div class="footer-btn-container">
        <button class="btn-footer" @click="openCheckOut">check availability</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    space: {
      type: Object,
    },
  },
  methods:{
      openCheckOut(){
          console.log('checkout');
          this.$emit('emitChange')
      }
  },
  computed:{
      ratingForDisplay() {
      return this.space.reviewScores.rating / 20;
    },
  }
};
</script>

<style lang="scss" scoped>
.narrow-footer-container {
  position: fixed;
  bottom: 0px;
  z-index: 999;
  width: 100%;
  display: flex;
  flex-direction: column;
  border-top: 1px solid rgb(221, 221, 221) !important;
  .content-container {
    background-color: #fff;
    flex-direction: row;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    height: 80px;


    .btn-footer{
        color: #ffffff;
        width: 160px;
        height: 48px;
        line-height: 20px !important;
        font-weight: 600 !important;
        font-size: 14px;
        outline: none !important;
        background-image: linear-gradient(
          to right,
          #ff385c,
          #ef305c,
          #e93568,
          #ce235b,
          #ce2d63
        );
        border: none;
        overflow: hidden !important;
        border-radius: 8px !important;
    }
  }
}
</style>