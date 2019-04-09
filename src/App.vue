<template>
  <div id="app">
    <div id="content" v-show="isMobile">
      <router-view />
    </div>
    <transition name="fade">
      <Error :value="isMobile" @input="isMobileChange" v-show="!isMobile" />
    </transition>
  </div>
</template>
<script>
import Error from "@/components/Error";
import { APP_MOBILE_RESOLUTION } from "@/services/ConstService";

export default {
  name: "App",
  components: {
    Error
  },
  data() {
    return {
      isMobile: true
    };
  },
  methods: {
    isMobileChange(value) {
      this.isMobile = value;
    }
  }
};
</script>
<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body {
  height: 100%;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

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
