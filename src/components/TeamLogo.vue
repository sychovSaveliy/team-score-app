<template>
  <div class="logo" :class="align" :style="{backgroundImage: img}">
    {{ getFirstLetter || getFirstLetterPlayer }}
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
    teamName: {default: '', type: String},
    playerName: {default: '', type: String},
    align: {default: 'left', type: String},
    img: {
      default: 'url(../assets/images/team-profile-avatar.svg)',
      type: String
    }
  },  
  computed: {
    getFirstLetter() {
      return this.teamName[0] || ''
    },
    getFirstLetterPlayer() {
      console.dir(this)
      return this.playerName[0] || ''
    }
  },
};
</script>

<style lang="scss" scoped>
.logo{
  width: 10vw;//40px
  height: 10vw;//40px
  line-height: 10vw;//40px
  background-size: 60% auto;//25px 30px
  background-position: center;
  background-repeat: no-repeat;
  font-size: 3.5vw;//18px
  position: relative;
  text-transform: uppercase;
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
    color: #0E72CF;
    background-image: url(../assets/images/team-logo-blue.svg);
  }
  &.right{
    color: #2BBB3A;
    background-image: url(../assets/images/team-logo-green.svg);    
  }
  &.avatar {
    width: 30vw;
    height: 30vw;
    line-height: 30vw;
    margin: -10px 15px;
    background-size: 70% auto;
  }
  &.myimg {
    border-radius: 50%;
    box-shadow: 0px 0px 8px rgba(218, 218, 218, 0.6);
    background-size: cover;
  }
}
</style>
