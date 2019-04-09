<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/prototype-1">Prot 1</router-link>
    </div> -->
    <div id="content" v-if="mobile">
      <router-view />
    </div>
    <div id="error" v-else>
      <div class="error-content">
        Error - Not mobile
      </div>
      <div class="bg-box"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      mobile: false
    };
  },
  created() {
    this.isMobile();
  },
  mounted() {
    window.addEventListener("resize", this.isMobile);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.isMobile);
  },
  methods: {
    isMobile() {
      this.mobile = !window.matchMedia("(min-width: 768px)").matches;
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

$error-width: 300px;
$error-height: 90px;

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
