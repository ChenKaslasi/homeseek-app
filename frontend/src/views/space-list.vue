<template>
  <section class="space-list main-layout main-content" >
    <space-header />
    <div class="loader" v-if="isLoading"><img src="../assets/img/loader.gif"></div>
    <list-filter v-if="filterBy && !isLoading" @changeFilter="setFilter" :space="filterBy"></list-filter>
    <div >
      <ul class="list-card-container">
        <li v-for="space in spaces" :key="space._id">
          <space-preview
            :space="space"
            @click.native="spaceSelected(space._id)"
          ></space-preview>
        </li>
      </ul>
    </div>
    <space-footer v-if="!isLoading" />
  </section>
</template>

<script>
import spacePreview from "../cmps/space-preview.cmp.vue";
import spaceHeader from "@/cmps/space-header.cmp.vue";
import listFilter from "@/cmps/list-filter.cmp.vue";

import spaceFooter from "@/cmps/space-footer.cmp.vue";

export default {
  components: {
    spaceHeader,
    spacePreview,
    listFilter,
    spaceFooter
  },
  data() {
    return {
      filterBy: {},
      isLoading: true
    };
  },
  async created() {
    this.filterBy = this.$route.query;
    const filterBy = this.filterBy;
    await this.$store.dispatch({
      type: "filterSpaces",
      filterBy,
    });
    this.isLoading = false
  },
  watch: {
    $route: async function () {
      this.filterBy = this.$route.query;
      const filterBy = this.filterBy;
      await this.$store.dispatch({
        type: "filterSpaces",
        filterBy,
      });
    },
  },
  computed: {
    spaces() {
      return this.$store.getters.spacesForDisplay;
    },
  },
  methods: {
    setFilter(filter) {
    this.$store.commit({ type: "setFilter", filter });
  },
    spaceSelected(id) {
      console.log(this.filterBy);
      this.$router.push(`/${this.filterBy.city}/${id}`);
    },
  },
};
</script>
