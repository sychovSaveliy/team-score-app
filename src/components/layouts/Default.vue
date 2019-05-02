<template>
  <div>
    <slot />
    <nav-bar />
  </div>
</template>

<script>
import navBar from "@/components/common/layouts/NavBar";
export default {
  name: 'Default',
  components: {
    navBar
  }
}
</script>


