<template>
  <el-input-number class="input-num"
    v-model="num"
    @change="handleChange"
    :min="1"
    :max="10"
  ></el-input-number>
</template>
<script>
export default {
  data() {
    return {
      num: 1,
    };
  },
  methods: {
    handleChange(value) {
      this.$emit("emitChange", value);
      // console.log(value)
    },
  },
};
</script>
<style lang="scss" scoped>
</style>