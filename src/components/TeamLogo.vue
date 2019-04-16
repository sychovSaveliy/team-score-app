<template>
  <div class="team-logo" :class="align">
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
    teamName: {default: '', type: String, required: true},
    align: {default: 'left', type: String}
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
  width: 10vw;//40px
  height: 10vw;//40px
  line-height: 10vw;//40px
  background-size: 60% auto;//25px 30px
  background-position: center;
  background-repeat: no-repeat;
  font-size: 3.5vw;//18px
  position: relative;
  &:after{
    content: '';
    box-shadow: 0px 0px 8px rgba(218, 218, 218, 0.6);
    border-radius: 50%;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    z-index: -1;
    position: absolute;
  }
  &.left{
    order: 2;
    color: #0E72CF;
    background-image: url(../assets/images/team-logo-blue.svg);
  }
  &.right{
 
    order: 0;
    color: #2BBB3A;
    background-image: url(../assets/images/team-logo-green.svg);    
  }
}
</style>
