<template>
  <div class="team-profile" :class="{ right: align == 'right' }">
    {{ /* team */ }}
    <TeamLogo :team-name=team.data.name />
    <div>
      <div>{{ team.data.name }}</div>
      <div>{{ team.data.city }}</div>
    </div>
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
    }
  },
  props: {
    team: Object,
    align: String
  },
};
</script>

<style lang="scss" scoped>
.team-profile{
  color: red;
  display: flex;
  color: rgba(0, 0, 0, 0.87);
  font-size: 12px;
  margin-bottom: 10px;
}
</style>
