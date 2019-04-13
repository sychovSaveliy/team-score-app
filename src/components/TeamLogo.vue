<template>
  <div class="team-logo">
    {{ getFirstLetter }}
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
    teamName: String
  },  
  mounted(){
  },
  computed: {
    getFirstLetter() {
      return this.teamName[0]
    }    
  },
};
</script>

<style lang="scss" scoped>
.team-logo{
  color: red;
  border: 1px solid yellow;
  width: 100px;
  float: left;
}
</style>
