<template>
  <div id="app">
    <!-- <space-header /> -->
    <main>
      <router-view :key="$route.name + ($route.params.id || '')" />
    </main>
    <!-- <space-footer /> -->
  </div> 
</template>

<script>
// import spaceHeader from "@/cmps/space-header.cmp.vue";
// import spaceFooter from "@/cmps/space-footer.cmp.vue";

export default {
  components: {
    // spaceHeader,
    // spaceFooter,
  },
};
</script>
