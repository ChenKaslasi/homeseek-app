<template>
  <section class="user-trips main-layout main-content">
    <space-header />
    <header>
      <h1>Trips</h1>
    </header>
    <ul v-if="ordersForDisplay" class="order-container">
      <li v-for="order in ordersForDisplay" :key="order._id">
        <div class="order-card">
          <img class="card-img" :src="order.imgUrl" />
          <small class="order-dates"
            >{{ datesForDisplay(order.dates.checkIn) }}-{{
              datesForDisplay(order.dates.checkOut)
            }}</small
          >
          <h3 class="order-city">{{ order.city }}</h3>
          <div class="card-bottom">
            <button @click="goToDetails(order)" class="order-btn">
              <img class="order-thumbnail" :src="order.thumbnail" />
              <h3 class="order-name">{{ order.spaceName }}</h3>
            </button>
            <!-- <span>&#10095;</span> -->
          </div>
        </div>
      </li>
    </ul>
    <userSvg></userSvg>
  </section>
</template>

<script>
import spaceHeader from "../cmps/space-header.cmp.vue";
import moment from "moment";
import userSvg from "../cmps/user-profile-svg";
export default {
  components: { spaceHeader, userSvg },
  data() {
    return {
      user: null,
      orders: [],
    };
  },
  created() {
    this.user = JSON.parse(JSON.stringify(this.$store.getters.loggedinUser));
    this.setOrdersProfile({ id: this.user._id });
  },
  computed: {
    ordersForDisplay() {
      const orders = JSON.parse(JSON.stringify(this.$store.getters.ordersForDisplay));
      return orders.reverse();
      // return this.$store.getters.ordersForDisplay;
    },
  },
  methods: {
    goToDetails(order) {
      this.$router.push(`/${order.city}/${order.spaceId}`);
    },
    datesForDisplay(order) {
      var a = moment(order).format("YYYY-MM-DD");
      var timeRefined = moment(a).format("MMM DD yyyy");
      return timeRefined;
    },
    async setOrdersProfile(filterBy) {
      const filterId = filterBy.id;
      this.orders = await this.$store.dispatch({
        type: "filterProfile",
        filterId,
      });
    },
  },
};
</script>