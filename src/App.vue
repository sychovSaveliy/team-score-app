<template>
  <div id="app">
    <div
      v-show="isMobile"
      id="content"
    >
      <router-view />
    </div>
    <transition name="fade">
      <Error
        v-show="!isMobile"
        :value="isMobile"
        @input="isMobileChange"
      />
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
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

#content {
  height: 100%;
}
</style>
