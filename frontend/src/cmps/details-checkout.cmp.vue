<template>
  <section class="checkout-container" @click="emitClose">
    <div class="checkout-card" @click.stop>
      <section class="aligner" v-if="space">
        <div class="checkout-header flex">
          <h3 class="price">${{ space.price }}<span> / night</span></h3>
          <!-- {{range}} -->
          <div v-if="space.reviewScores">
            <span class="star">󰀄</span>
            <span class="rating">{{ ratingForDisplay }}</span>
            <span class=""> {{ `(${space.reviews.length})` }} </span>
          </div>
        </div>
        <form @submit.prevent>
          <div class="checkout-select">
            <v-date-picker
              v-model="range"
              is-range
              :min-date="new Date()"
              :disabled-dates="[
                { start: new Date(2020, 11, 15), end: new Date(2020, 11, 18) },
                { start: new Date(2020, 11, 20), end: new Date(2020, 11, 22) },
                { start: new Date(2020, 11, 30), end: new Date(2021, 0, 2) },
                { start: new Date(2021, 0, 4), end: new Date(2021, 0, 5) },
                { start: new Date(2021, 0, 14), end: new Date(2021, 0, 15) },
                { start: new Date(2021, 0, 24), end: new Date(2021, 0, 28) },
              ]"
            >
              <template v-slot="{ inputValue, inputEvents }">
                <div class="input-container flex justify-center items-center">
                  <input
                    :value="inputValue.start"
                    v-on="inputEvents.start"
                    class="start-date"
                  />
                  <input
                    :value="inputValue.end"
                    v-on="inputEvents.end"
                    class="end-date"
                  />
                </div>
              </template>
            </v-date-picker>
            <button class="guest-modal-btn" @click.stop="guestModal">
              {{ adultCount + childrenCount + infantCount }} guest
            </button>
            <div class="modal" v-if="isShown">
              <div class="container-btns">
                <div class="btn-container">
                  <div class="txt">Adults:</div>
                  <div class="btns">
                    <button class="guest-btn" @click="setAdult(-1)">-</button>
                    <p>{{ adultCount }}</p>
                    <button class="guest-btn" @click="setAdult(1)">+</button>
                  </div>
                </div>
                <div class="btn-container">
                  <div class="txt">Children:</div>
                  <div class="btns">
                    <button class="guest-btn" @click="setChildren(-1)">
                      -
                    </button>
                    <p>{{ childrenCount }}</p>
                    <button class="guest-btn" @click="setChildren(1)">+</button>
                  </div>
                </div>
                <div class="btn-container">
                  <div class="txt">Infants:</div>
                  <div class="btns">
                    <button class="guest-btn" @click="setInfant(-1)">-</button>
                    <p>{{ infantCount }}</p>
                    <button class="guest-btn" @click="setInfant(1)">+</button>
                  </div>
                </div>
                <div class="close-btn">
                  <p @click="guestModal">Close</p>
                </div>
              </div>
            </div>
          </div>
          <button
            @click="checkOut"
            ref="btnTxt"
            :disabled="isDisabled"
            :class="['checkout-btn', { disabledBtn: isDisabled }]"
          >
            Check Availability
          </button>
          <div v-if="isCheckingOut" class="reserve-extension">
            <div class="extension-container">
              <div class="warning">
                <small class="payment-warning">You will be charged</small>
              </div>
              <div class="payment-desc">
                <p>{{ adultCount + childrenCount + infantCount }} guest</p>
                <div class="pricing">
                  <p>{{ space.price }} X {{ getDates }}</p>
                  <p>{{ totalPrice }}</p>
                </div>
                <p class="total">Total: {{ totalPrice }}</p>
              </div>
            </div>
          </div>
        </form>
      </section>
    </div>
  </section>
</template>

<script>
import vDatePicker from "v-calendar/lib/components/date-picker.umd";
// import moment from 'moment'
export default {
  props: {
    space: {
      type: Object,
    },
    dates: {
      type: Object,
    },
  },
  data() {
    return {
      adultCount: 1,
      childrenCount: 0,
      infantCount: 0,
      isShown: false,
      isCheckingOut: false,
      isDisabled: false,
      order: {
        createdAt: Date.now(),
        userId: null,
        userName: null,
        spaceId: "",
        status: null,
        totalPrice: null,
        guests: null,
        dates: {
          checkIn: null,
          checkOut: null,
        },
      },
      range: {
        start: new Date().getTime(),
        end: new Date().setDate(new Date().getDate() + 1),
      },
    };
  },
  computed: {
    totalPrice() {
      let priceByNights = this.getDates * this.space.price;
      var locale = {
        style: "currency",
        currency: "USD",
      };

      var x = priceByNights.toLocaleString("en-US", locale);
      return x;
    },
    priceForDisplay() {
      return this.space.price * this.getDates;
    },
    ratingForDisplay() {
      return this.space.reviewScores.rating / 20;
      // return this.space.reviewScores.rating ;
    },
    getDates() {
      const day = 24 * 60 * 60 * 1000;
      return Math.round(Math.abs((this.range.start - this.range.end) / day));
    },
  },
  methods: {
    emitClose() {
      this.$emit("emitClose");
    },
    updateNight(num) {
      this.nights = num;
    },
    guestModal() {
      this.isShown = !this.isShown;
    },
    setAdult(value) {
      this.adultCount += value;
    },
    setChildren(value) {
      this.childrenCount += value;
    },
    setInfant(value) {
      this.infantCount += value;
    },
    checkOut() {
      if (!this.isCheckingOut) {
        this.$refs.btnTxt.innerHTML = "Reserve";
        return (this.isCheckingOut = true);
      }
      if (this.isCheckingOut) {
        this.addOrder(this.space._id);
        this.isCheckingOut = !this.isCheckingOut;
        this.$refs.btnTxt.innerHTML = "Reserved!";
        this.isDisabled = true;
      }
    },
    addOrder(spaceId) {
      const order = JSON.parse(JSON.stringify(this.order));
      order.spaceId = spaceId;
      order.city = this.space.address.city;
      order.imgUrl=this.space.imgs[0]
      order.thumbnail=this.space.imgs[1]
      order.spaceName=this.space.name
      order.status = "Pending";
      order.user = JSON.parse(sessionStorage.user);
      order.totalPrice = this.priceForDisplay;
      order.nights = this.getDates;
      order.guests = this.adultCount + this.childrenCount + this.infantCount;
      order.dates.checkIn = this.range.start;
      order.dates.checkOut = this.range.end;
      order.userId = this.$store.getters.loggedinUser._id;
      this.$store.dispatch({
        type: "addOrder",
        order: order,
      });
      let orderMini = {
        spaceId: spaceId,
        dates: {
          checkIn: this.range.start,
          checkOut: this.range.end,
        },
        nights: this.getDates,
        guests: this.adultCount + this.childrenCount + this.infantCount,
      };
      const updateSpace = JSON.parse(JSON.stringify(this.space));
      if (!updateSpace.orders) {
        updateSpace.orders = [];
        updateSpace.orders.push(orderMini);
      } else {
        updateSpace.orders.push(orderMini);
      }
      this.$store.dispatch({
        type: "updateSpace",
        updatedSpace: updateSpace,
      });
      console.log('isHost' ,order.user.isHost);
      
      this.$emit("emitCheckoutEvent");
    },
  },
  components: {
    vDatePicker,
    // numberInput,
  },
};
</script>

<style lang="scss" scoped>
.disabledBtn {
  background-color: rgb(113, 113, 113) !important;

  //  background-color: rgb(176, 176, 176) !important;
  background-image: none !important;
  // background-color:#717171 !important ;
  &:hover {
    cursor: not-allowed !important;
  }
}
.reserve-extension {
  .extension-container {
    // padding: 10px;
    display: flex;
    flex-direction: column;
    .warning {
      small {
        font-size: 14px;
        color: #717171;
      }
    }
    .payment-desc {
      padding: 10px;

      .pricing {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      p {
        padding: 10px;
        font-weight: 400;
        color: rgb(34, 34, 34);
        display: block;
        text-align: left;
        line-height: 20px;
        padding: 18px 0px 12px;
      }
      .total {
        border-top: 1px solid rgb(221, 221, 221);
        list-style-type: none;
        margin: 9px 0px 0px;
        // padding: 24px 0px 12px;
        font-weight: 800;
        font-size: 16px;
      }
    }
    .warning {
      margin: 0 auto;
      padding-top: 10px;
    }
  }
}
</style>