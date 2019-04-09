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
      Error - Not mobile
    </div>
  </div>
</template>
<script>
  export default {
    name: 'App',
    data () {
      return {
        'mobile': false,
      }
    },
    created () {
      this.isMobile();
    },
    methods: {
      onResize(event) {
        console.log('window has been resized', event)
      }
    },
    mounted() {
      window.addEventListener('resize', this.isMobile)
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.isMobile)
    },
    methods: {
      isMobile () {
        if (window.matchMedia("(min-width: 768px)").matches) {
          this.mobile = false
        } else {
          this.mobile = true
        }
      },
    },
  }
</script>
<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
