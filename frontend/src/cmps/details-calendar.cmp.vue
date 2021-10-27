<template>
  <section class="calender-contianer">
    <h2 v-if="space">{{ getDates }} nights in {{ space.address.city }}</h2>
    <span v-if="space">{{ getStartDate }} - {{ getEndDate }}</span>

    <picker
      class="picker"
      v-model="range"
      :min-date="new Date()"
      :disabled-dates="[
        { start: new Date(2020, 11, 15), end: new Date(2020, 11, 18) },
        { start: new Date(2020, 11, 20), end: new Date(2020, 11, 22) },
        { start: new Date(2020, 11, 30), end: new Date(2021, 0, 2) },
        { start: new Date(2021, 0, 4), end: new Date(2021, 0, 5) },
        { start: new Date(2021, 0, 14), end: new Date(2021, 0, 15) },
        { start: new Date(2021, 0, 24), end: new Date(2021, 0, 28) },
      ]"
      :select-attribute="selectDragAttribute"
      :drag-attribute="selectDragAttribute"
      is-range
      @drag="dragValue = $event"
      @input="emitDates()"
      :columns="$screens({ default: 1, lg: 2 })"
      is-expanded
    >
      <template v-slot:day-popover="{ format }">
        <div>
          {{ format(dragValue ? dragValue.start : range.start, "MMM D") }}
          -
          {{ format(dragValue ? dragValue.end : range.end, "MMM D") }}
        </div>
      </template>
    </picker>
  </section>
</template>

<script>
// import calendar from "v-calendar/lib/components/calendar.umd";
import picker from "v-calendar/lib/components/date-picker.umd";
import moment from "moment";

export default {
  props: {
    space: Object,
  },
  components: {
    // calendar,
    picker,
  },
  data() {
    return {
      dragValue: null,
      clickCounter: 0,
      range: {
        start: new Date(),
        end: new Date().setDate(new Date().getDate() + 1),
      },
    };
  },
  methods: {
    emitDates() {
      this.clickCounter++;
      if (this.clickCounter < 1) return;
      this.$emit("emitDates", { start: this.range.start, end: this.range.end });
    },
  },
  computed: {
    selectDragAttribute() {
      return {
        popover: {
          visibility: "hover",
          isInteractive: false,
        },
      };
    },
    getDates() {
      const day = 24 * 60 * 60 * 1000;
      return Math.round(Math.abs((this.range.start - this.range.end) / day));
    },
    getStartDate() {
      return moment(this.range.start).format("LL");
    },
    getEndDate() {
      return moment(this.range.end).format("LL");
    },
  },
};
</script>

<style>
</style>