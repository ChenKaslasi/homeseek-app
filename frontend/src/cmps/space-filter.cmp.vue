<template>
  <section
    :class="{ 'scroll-shift': isScrolled }"
    class="filter-container flex justify-center align-center"
  >
    <div
      class="wrapper flex"
      @mouseover="colorSearchArea"
      @mouseleave="unColorSearchArea"
    >
      <popper
        class="box"
        ref="locationBox"
        trigger="click"
        :options="{
          placement: 'bottom',
          modifiers: { offset: { offset: '0,15px' } },
        }"
      >
        <div class="location flex column" slot="reference">
          <span class="title">Location</span>
          <input
            :class="[{ active: filterBy.city.length > 0 }, 'desc']"
            type="text"
            placeholder="Where are you going?"
            v-model="filterBy.city"
          />
        </div>

        <div class="location-dropdown flex column">
          <span class="header">GATEWAYS</span>
          <div class="loc-btn flex wrap">
            <div @click="setLocation">Barcelona</div>
            <div @click="setLocation">New York</div>
            <div @click="setLocation">Sydney</div>
          </div>
        </div>
      </popper>
      <popper
        class="box"
        ref="dateBox"
        trigger="click"
        :options="{
          placement: 'bottom',
          modifiers: { offset: { offset: '0,15px' } },
        }"
      >
        <div class="dates flex column" slot="reference">
          <span class="title">Dates</span>
          <span
            v-if="filterBy.date.start"
            :class="[{ active: filterBy.date.end.length > 0 }, 'desc']"
            >{{ filterBy.date.start }} - {{ filterBy.date.end }}</span
          >
          <span v-else class="desc">Check in - Check out</span>
        </div>
        <details-calendar @emitDates="setDates" />
      </popper>

      <popper
        data-name="guest"
        ref="guestBox"
        class="box"
        trigger="click"
        :options="{
          placement: 'bottom',
          modifiers: { offset: { offset: '0,5px' } },
        }"
      >
        <div
          data-name="guest"
          @mouseover="colorSearchArea"
          @mouseleave="unColorSearchArea"
          class="guests flex column"
          slot="reference"
        >
          <span data-name="guest" class="title">Guests</span>
          <span data-name="guest" v-if="sumGuests === 0" class="desc"
            >Add guests</span
          >
          <span
            data-name="guest"
            v-else
            :class="[{ active: sumGuests > 0 }, 'desc']"
            >{{ sumGuests + (sumGuests === 1 ? " guest" : " guests") }}
          </span>
        </div>

        <div class="guest-dropdown">
          <div class="modal">
            <div class="container-btns">
              <div class="btn-container">
                <div class="txt flex column">
                  <span class="title">Adults:</span>
                  <span class="sub">Ages 13 or above</span>
                </div>
                <div class="btns">
                  <button class="guest-btn" @click="setAdult(-1)">-</button>
                  <p>{{ filterBy.adultCount }}</p>
                  <button class="guest-btn" @click="setAdult(1)">+</button>
                </div>
              </div>
              <div class="btn-container">
                <div class="txt flex column">
                  <span class="title">Children:</span>
                  <span class="sub">Ages 2–12</span>
                </div>
                <div class="btns">
                  <button class="guest-btn" @click="setChildren(-1)">-</button>
                  <p>{{ filterBy.childrenCount }}</p>
                  <button class="guest-btn" @click="setChildren(1)">+</button>
                </div>
              </div>
              <div class="btn-container">
                <div class="txt flex column">
                  <span class="title">Infants:</span>
                  <span class="sub">Under 2</span>
                </div>
                <div class="btns">
                  <button class="guest-btn" @click="setInfant(-1)">-</button>
                  <p>{{ filterBy.infantCount }}</p>
                  <button class="guest-btn" @click="setInfant(1)">+</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </popper>

      <div
        data-name="search"
        ref="search"
        class="search-icon flex jusify content align-center"
        @click="filter"
      >
        <div data-name="search" class="btn">
          <img data-name="search" src="../assets/icons/search_m.svg" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import detailsCalendar from "./details-calendar.cmp.vue";
import Popper from "vue-popperjs";
import moment from "moment";

export default {
  components: {
    detailsCalendar,
    Popper,
  },
  props: {
    isHomePage: Boolean,
  },
  data() {
    return {
      filterBy: {
        city: "",
        date: {
          start: "",
          end: "",
        },
        adultCount: 0,
        childrenCount: 0,
        infantCount: 0,
      },
      isScrolled: false,
    };
  },
  methods: {
    onScroll() {
      const currentScrollPosition =
        window.pageYOffset || document.documentElement.scrollTop;

      // hendle momentum scrolling on mobile
      if (currentScrollPosition < 0) {
        return;
      }
      if (currentScrollPosition === 0 && this.headerWide) {
        this.headerWide = false;
        this.headerNarrow = true;
      }
      this.isScrolled = currentScrollPosition !== 0;
    },

    async filter() {
      const {
        city,
        date,
        adultCount,
        childrenCount,
        infantCount,
      } = this.filterBy;
      await this.$router.push({
        path: "/city",
        query: {
          city,
          checkin: date.start,
          checkout: date.end,
          adultCount,
          childrenCount,
          infantCount,
        },
      });
    },
    setAdult(value) {
      if (this.filterBy.adultCount === 0 && value === -1) return;
      this.filterBy.adultCount += value;
    },
    setChildren(value) {
      if (this.filterBy.childrenCount === 0 && value === -1) return;
      this.filterBy.childrenCount += value;
    },
    setInfant(value) {
      if (this.filterBy.infantCount === 0 && value === -1) return;
      this.filterBy.infantCount += value;
    },
    setLocation(ev) {
      this.filterBy.city = ev.target.textContent;
    },
    setDates({ start, end }) {
      this.filterBy.date.start = moment(start).format("L");
      this.filterBy.date.end = moment(end).format("L");
    },
    colorSearchArea(ev) {
      const data = ev.target.getAttribute("data-name");
      if (data === "guest") {
        this.$refs.search.style.cssText = "background-color: #eee";
      }
      if (data === "search" || data !== "guest") {
        this.$refs.search.style.cssText = "background-color: #fff";
        return;
      }
    },
    unColorSearchArea() {
      this.$refs.search.style.cssText = "background-color: #fff";
    },
  },
  computed: {
    sumGuests() {
      return (
        this.filterBy.adultCount +
        this.filterBy.childrenCount +
        this.filterBy.infantCount
      );
    },
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
    if (this.$route.query.city) {
      this.filterBy.city = this.$route.query.city;
    }
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
};
</script>

<style lang="scss" scoped>
.calender-contianer {
  padding: 0;
}

.active {
  color: #222 !important;
}
</style>