<template>
  <nav class="nav-bar">
      <router-link 
        v-for="(item, index) in menuItems" 
        :to="item.path" 
        :key="`index-${index}`"
        class="nav-bar__link"
      >
        <span v-html="item.icon"></span>
      </router-link>
  </nav>
</template>

<script>
import GamesIcon from '@/assets/icons/navbar/icon_games.svg';
import ProfileIcon from '@/assets/icons/navbar/icon_profile.svg';
import MessageIcon from '@/assets/icons/navbar/icon_message.svg';
import ScoreIcon from '@/assets/icons/navbar/icon_score.svg';
import SearchIcon from '@/assets/icons/navbar/icon_search.svg';
export default {
  name: 'NavBar',
  data()  {
    return {
      menuItems: [
        {
          path: '/score',
          icon: ScoreIcon
        },
        {
          path: '/profile',
          icon: ProfileIcon
        },
        {
          path: '/games',
          icon: GamesIcon
        },
        {
          path: '/seach',
          icon: SearchIcon
        },
        {
          path: '/massage',
          icon: MessageIcon
        }
      ]
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/_variables.scss';

.nav-bar {
  display: flex;
  justify-content: space-around;
  box-shadow: 0px 4px 5px 0px black;
  padding: 9px 0;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;


  &__link {
    width: 75px;

    &.router-link-active svg path[fill-rule] {
      fill: $active-icon;
    }
  }
}

</style>


