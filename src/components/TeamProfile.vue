<template>
  <div class="team__profile" :class="align">
    <div class="team__logo">
      <TeamLogo :team-name="team.teamName" :align="align"/>
    </div>
    <div class="team__info">
      <div class="team__name">{{ team.teamName }}</div>
      <div class="team__city">{{ team.city }}</div>
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
  data() {
    return {};
  },
  props: {
    team: {
      type: Object,
      default: function() {
        return { teamName: "" };
      }
    },
    align: { default: "left", type: String }, 
    img: {
      tshirt: `url('${require(`../assets/images/team-profile-avatar.svg`)}')`,
      logoBlue: `url('${require(`../assets/images/team-logo-blue.svg`)}')`,
      logoGreen: `url('${require(`../assets/images/team-logo-green.svg`)}')`,
      type: String
    }
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
