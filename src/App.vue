<template>
  <div id="app">
    <div v-show="isMobile" id="content">
      <default-layout  class="default-layout">
        <router-view/>
      </default-layout>
    </div>
    <transition name="fade">
      <Error v-show="!isMobile" :value="isMobile" @input="isMobileChange"/>
    </transition>
  </div>
</template>
<script>
import Error from "@/components/Error";
import defaultLayout from "@/components/layouts/Default";
import { APP_MOBILE_RESOLUTION } from "@/services/ConstService";
import API from "@/services/ApiService";

export default {
  name: "App",
  components: {
    Error,
    defaultLayout
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
  },
  created() {
    API.loadConfigs();
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
.default-layout {
  height: 100%;
  padding-bottom: 65px;
}
</style>
