<template>
  <div class="team-profile">{{ team }}</div>
</template>

<script>
export default {
  name: "TeamProfile",
  data () {
    return {
    }
  },
  props: {
    team: Object
  },
};
</script>

<style lang="scss" scoped>
.team-profile{
  color: red;
  border: 1px solid green;
}
</style>
