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
</style>
