<template>

  <div class="prototype">
    <Ttabs :list="[
      {title:'мои игры', action: popupMy, aClass: true},
      {title:'все игры', action: popupAll, aClass: false}
    ]" />
  </div>

</template>

<script>
import Ttabs from "@/components/Ttabs"
export default {
  name: "Prototype5",
  components: {
    Ttabs
  },
  data() {
    return {
      text: "Example text prototype 5",
      
    }
  }
};
</script>

<style lang="scss">
.prototype {
  font-size: 24px;
}
</style>
