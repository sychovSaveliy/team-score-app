<template>
  <div class="prototype">
    {{ text }}
    <TButton view="fluid social">Найти</TButton>
  </div>
</template>

<script>
import TButton from "@common/TButton";
export default {
  name: "Prototype1",
  components: {
    TButton
  },
  data() {
    return {
      text: "Example text prototype 1",
      buttonTheme: "active"
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.prototype {
  font-size: 24px;
}
</style>
