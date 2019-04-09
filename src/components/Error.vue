<template>
  <div id="error">
    <div class="error-content">
      Error - Not mobile
    </div>
    <div class="bg-box"></div>
  </div>
</template>

<script>
import { APP_MOBILE_RESOLUTION } from "@/services/ConstService";

export default {
  name: "Error",
  props: {
    value: {
      default: false,
      type: Boolean,
      required: true
    }
  },
  created() {
    this.isMobile();
  },
  mounted() {
    window.addEventListener("resize", this.isMobile);
  },
  methods: {
    isMobile(event) {
      let isResolutionChanged = window.innerWidth <= APP_MOBILE_RESOLUTION;
      if (this.value === isResolutionChanged) return;
      this.$emit("input", isResolutionChanged);
    }
  }
};
</script>

<style lang="scss" scoped></style>
