<template>
  <div class="team-logo-block">
    <div class="team-logo">
      {{ getFirstLetter }}
    </div>
  </div>
</template>

<script>
export default {
  name: "TeamLogo",
  data () {
    return {
    }
  },
  props: {
    teamName: {default: '', type: String, required: true}
  },  
  computed: {
    getFirstLetter() {
      return this.teamName[0]
    }    
  },
};
</script>

<style lang="scss" scoped>
.team-logo-block{
  box-shadow: 0px 0px 8px rgba(218, 218, 218, 0.6);
  border-radius: 50%;
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  order: 2;
}
.team-logo{
  color: #0E72CF;
  width: 25px;
  height: 30px;
  line-height: 30px;
  background-image: url(../assets/images/team-logo-blue.svg);
  background-size: cover;
  font-size: 18px;
}
.team-profile{
  &.right{
    .team-logo-block{
      margin-left: 10px;
      margin-right: 0;
      order: 0;
      .team-logo{
        color: #2BBB3A;
        background-image: url(../assets/images/team-logo-green.svg);
      }
    }  
  }
}

</style>
