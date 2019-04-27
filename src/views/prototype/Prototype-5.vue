<template>
  <div class="prototype">
    <Ttabs :list='list' />
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
        { title: "мои игры", actionTab: this.showMyGames, classNames: ["active"] },
        { title: "все игры", actionTab: this.showAllGames, classNames: [] }
      ],
      item: ["item"]
    };
  },
  methods: {
    showMyGames(tabItem) {
      tabItem.classNames = ["active"];
      console.log('do showMyGame');

    },
    showAllGames(tabItem) {;
      tabItem.classNames = ["active"];
      console.log('do showAllGames');
    }
  }
};
</script>

<style lang="scss">
.prototype {
  font-size: 24px;
}
</style>
