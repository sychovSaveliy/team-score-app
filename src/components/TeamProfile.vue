<template>
  <div class="team-profile">
    {{ /* team */ }}
    <TeamLogo :team-name=teamName />
    <div>{{ team.data.name }}</div>
    <div>{{ team.data.city }}</div>
  </div>
</template>

<script>
import TeamLogo from "@/components/TeamLogo";
export default {
  name: "TeamProfile",
  components: {
    TeamLogo
  },
  data () {
    return {
      teamName: this.team.data.name
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
