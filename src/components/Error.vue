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

<style lang="scss" scoped>
#error {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .error-content {
    background-color: rgb(133, 0, 0);
    color: #fafafa;
    padding: 15px;
    font-size: 24px;
    z-index: 2;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
    cursor: pointer;
    width: $error-width;
    height: $error-height;
    user-select: none;
  }

  .bg-box {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 1;
  }
}
</style>
