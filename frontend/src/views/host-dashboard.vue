<template>
  <section class="dashborad-container main-layout">
    <space-header />
    <section class="hostpage-container main-content flex">
      <div class="reservation">
        <div class="reservation-title">
          <div class="top">Pending / Accepted</div>
          <div class="bottom">
            <span
              >{{ orders.length + 3 }} new items ·
              {{ getResponseRate }} response rate</span
            >
          </div>
        </div>
        <div class="reservation-boxes">
          <div class="box flex" v-for="(order, counter) in orders" :key="counter">
            <div class="image">
              <img :src="order.user.userImg" />
            </div>
            <div class="txt">
              <div class="name">
                Request by: <span>{{ order.user.username }}</span>
              </div>
              <div class="expiry">Expires in 12 hours</div>
              <div class="desc">
                {{ order.guests }} {{ order.guests > 1 ? "guests" : "guest" }} ·
                {{ getDates(order.dates) }} · {{ order.space.name }}
              </div>
            </div>
            <div class="container-dash-btn" v-if="order.status===`Pending`">
              <p class="newAccept" @click="acceptOrder(order)" >accept </p> / <p class="newReject" @click="rejectOrder(order)"> reject </p>
              <!-- <button class="accept" @click="acceptOrder(order)">accept</button>
              <button class="reject" @click="rejectOrder(order)">reject</button> -->
            </div>
            <!-- <div class="responed" v-if="order.status !== `Pending`"> {{ order.status }} </div> -->
            <div class="responed" v-else> {{ order.status}} </div>
          </div>

          <div class="box flex">
            <div class="image">
              <img
                src="https://a0.muscache.com/im/pictures/user/7b1ee769-b250-4160-930f-96f89c5b4db0.jpg?im_w=240"
              />
            </div>
            <div class="txt">
              <div class="name">Request by: Elise</div>
              <!-- <div class="expiry">Expires in 2 hours</div> -->
              <div class="expiry">Expired</div>
              <div class="desc">
                3 guests ; november 16 - november 19 ; Resort-like living in
                Williamsburg
              </div>
            </div>
            <div class="responed">Accepted</div>
          </div>
          <div class="box flex">
            <div class="image">
              <img
                src="https://a0.muscache.com/im/pictures/user/dd24ff7d-8c11-4038-9ece-17142238410b.jpg?im_w=240"
              />
            </div>
            <div class="txt">
              <div class="name">Request by: Ciela</div>
              <!-- <div class="expiry">Expires in 6 hours</div> -->
              <div class="expiry">Expired</div>
              <div class="desc">
                2 guests ; november 03 - november 07 ; Resort-like living in
                Williamsburg
              </div>
            </div>
            <div class="responed">Accepted</div>
          </div>
          <div class="box flex">
            <div class="image">
              <img
                src="https://a0.muscache.com/im/pictures/user/63834664-93e1-4048-a06d-34fe490b3c3e.jpg?im_w=240"
              />
            </div>
            <div class="txt">
              <div class="name">Request by: Sabrisa</div>
              <!-- <div class="expiry">Expires in 12 hours</div> -->
              <div class="expiry">Expired</div>
              <div class="desc">
                3 guests ; october 29 - october 30 ; Resort-like living in
                Williamsburg
              </div>
            </div>
            <a class="responed">Accepted</a>
          </div>
        </div>
      </div>
      <div class="hosting-summary">
        <div class="summary-title">Hosting summary</div>
        <div class="summary-boxes">
          <div class="job-box flex justify-between">
            <div class="txt">
              <div class="top">Fantastic job !</div>
              <div class="bottom">
                <p>Guests love what you're doing.</p>
                <p>keep up the great work !</p>
              </div>
              <div class="details">View details</div>
            </div>
            <div class="image">
              <img src="../assets/icons/checkmark.svg" />
            </div>
          </div>
          <div class="earning-box">
            <div class="earnings flex justify-between">
              <div>November earnings</div>
              <div class="value">2650$</div>
            </div>
            <div class="views flex justify-between">
              <div>30-day views</div>
              <div class="value">751</div>
            </div>
          </div>
          <div class="reviews-box">
            <div class="rating flex justify-between">
              <div>Overall rating</div>
              <div class="value">4.9 󰀄</div>
            </div>
            <div class="reviews flex justify-between">
              <div>Total reviews</div>
              <div class="value">40</div>
            </div>
          </div>
          <host-svg />
        </div>
      </div>

      <!-- {{this.orders}} -->
    </section>
  </section>
</template>

<script>
import spaceService from "../services/space.service.js";
import spaceHeader from "../cmps/space-header.cmp.vue";
import hostSvg from "../cmps/host-svg.cmp.vue";
import moment from "moment";
export default {
  components: {
    spaceHeader,
    hostSvg,
  },
  data() {
    return {
      username: null,
      orders: [],
      isAccpted: false,
      isRejected: false,
      counter: 0,
    };
  },
  methods: {
    acceptOrder(order) {
      order.status = "Accepted";
      const updatedOrder = JSON.parse(JSON.stringify(order));
      updatedOrder.status = "Accepted";
      this.$store.dispatch({
        type: "updateOrder",
        updatedOrder: updatedOrder,
      });
      this.isAccpted = true
      this.counter++
      
    },
    rejectOrder(order) {
      order.status = "Rejected";
      console.log("reject", order);
      const updatedOrder = JSON.parse(JSON.stringify(order));
      updatedOrder.status = "Rejected";
      this.$store.dispatch({
        type: "updateOrder",
        updatedOrder: updatedOrder,
      });
      this.isRejected = true
      this.counter++
    },
    getDates(dates) {
      return `${moment(dates.checkIn).format("ll")} - ${moment(
        dates.checkOut
      ).format("ll")}`;
    },
    getSpaceName(spaceId) {
      console.log(spaceId);
      return spaceService.getById(spaceId);
    },
  },
  computed: {
    getResponseRate() {
      const approved = this.orders.filter((order) =>
        order.status.includes("Accepted")
      );
      console.log(this.orders.length);
      const responseRate = `${(
        ((approved.length + 3) / (this.orders.length + 3)) *
        100
      ).toFixed(0)}%`;
      return responseRate;
    },
  },
  async created() {
    if (!sessionStorage.user) {
      this.$router.push("/");
      return;
    }
    const activeUser = JSON.parse(sessionStorage.user);
    this.username = activeUser.username; //get user name
    const userId = { id: activeUser._id };
    await this.$store.dispatch({
      type: "filterOrders",
      userId,
    });
    this.orders = await JSON.parse(
      JSON.stringify(this.$store.getters.ordersForDisplay)
    );
    this.orders.reverse();
    this.orders.forEach(async function (order) {
      order.space = await spaceService.getById(order.spaceId);
    });
  },
};
</script>

<style lang="scss" scoped>
</style>>


  