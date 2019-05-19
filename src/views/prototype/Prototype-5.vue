<template>
  <div class="prototype">
    <Ttabs :list="list"/>
  </div>
</template>

<script>
import Ttabs from "@/components/Ttabs";
export default {
  name: "Prototype5",
  components: {
    Ttabs
  },
  data() {
    return {
      text: "Example text prototype 5",
      list: [
        { title: "мои игры", classNames: ["active"] },
        { title: "все игры", classNames: ["active"] }
      ]
    };
  },
  methods: {
  }
};
</script>

<style lang="scss">
.prototype {
  font-size: 24px;
}
</style>
