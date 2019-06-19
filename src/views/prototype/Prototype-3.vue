<template>
  <div class="team__profile" :class="align">
    <div class="team__logo">
      <TPavatar :team-name="team.data.teamName" /><!-- align="left" -->
      <!--TeamLogo :team-name="team.data.teamName" :align="align"/-->
    </div>
    <div class="team__info">
      <div class="team__name">{{ team.data.teamName }}</div>
      <div class="team__city">{{ team.data.city }}</div>
    </div>
  </div>
</template>

<script>
import TPavatar from "@/components/TPavatar";
import TeamLogo from "@/components/TeamLogo";
export default {
  name: "TeamProfile",
  components: {
    TeamLogo,
    TPavatar
  },
  data() {
    return {};
  },
  props: {
    team: {
      type: Object,
      default: function() {
        return { data: { name: "" } };
      }
    },
    align: { default: "left", type: String }
  }
};
</script>

<style lang="scss" scoped>
.team {
  &__profile {
    color: red;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: rgba(0, 0, 0, 0.87);
    font-size: 12px;
    margin-bottom: 10px;
    &.left {
      .team__info {
        text-align: right;
        margin-right: 10px;
        margin-left: 0;
      }
      .team__logo {
        order: 1;
      }
    }
  }
  &__info {
    flex-grow: 1;
    text-align: left;
    margin-left: 10px;
    margin-right: 0;
  }
  &__logo {
    order: 0;
  }
  &__name {
    font-weight: bold;
  }
}
</style>
