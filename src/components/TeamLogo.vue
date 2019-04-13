<template>
  <div class="team-logo">
    {{ this.teamLetter }}
  </div>
</template>

<script>
export default {
  name: "TeamLogo",
  data () {
    return {
      teamLetter: ""
    }
  },
  props: {
    teamName: String
  },  
  mounted(){
    this.getFirstLetter(teamName)
  },
  methods: {
    getFirstLetter(name) {
      let self = this
      console.log(name)
      self.teamLetter = name[0]

    }
  }
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
