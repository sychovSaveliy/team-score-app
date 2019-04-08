<template>
  <div class="prototype">
    {{ text }}
  </div>
</template>

<script>
export default {
  name: "Prototype-1",
  data() {
    return {
      text: "Example text prototype 1"
    };
  }
};
</script>

<style lang="scss">
.prototype {
  font-size: 24px;
}
</style>
