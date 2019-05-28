<template>
  <nav class="nav">
    <ul class="nav__list">
      <li class="nav__link">
        <router-link to="/score">
          <span class="nav__icon"><img :src="require(`../assets/icons/score.svg`)" alt/></span>
          <span class="nav__text">Рейтинг</span>
        </router-link>
      </li>
      <li class="nav__link">
        <router-link to="/profile">
          <span class="nav__icon"><img :src="require(`../assets/icons/profile.svg`)" alt/></span>
          <span class="nav__text">Профиль</span>
        </router-link>
      </li>
      <li class="nav__link">
        <router-link to="/">
          <span class="nav__icon"><img :src="require(`../assets/icons/games.svg`)" alt/></span>
          <span class="nav__text">Игры</span>
        </router-link>
      </li>
      <li class="nav__link">
        <router-link to="/search">
          <span class="nav__icon"><img :src="require(`../assets/icons/search.svg`)" alt/></span>
          <span class="nav__text">Поиск</span>
        </router-link>
      </li>
      <li class="nav__link">
        <router-link to="/messages">
          <span class="nav__icon"><img :src="require(`../assets/icons/chat.svg`)" alt/></span>
          <span class="nav__text">Сообщения</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Nav",
  data() {
    return {};
  }
};
</script>

<style lang="scss">
.nav {
  height: 83px;
  position: relative;
  font-size: 10px;
  background-color: white;
  &__list {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid $nav;
    padding: 10px 0 8px;
  }
  &__link {
    padding: 0 10px;
    text-align: center;
  }
  &__icon {
    background-color: $nav;
    display: inline-block;
    height: 24px;
    width: 24px;
    line-height: 28px;
    border-radius: 50%;
    img {
      width: 14px;
    }
    &:hover {
      background-color: $nav-active;
    }
  }
  &__text {
    color: $nav;
    font-size: 10px;
    display: inline-block;
    text-decoration: none;
    width: 100%;
  }
  a.router-link-active {
    .nav__text {
      color: $nav-active;
    }
    .nav__icon {
      background-color: $nav-active;
    }
  }
  &:after {
    content: '';
    position: absolute;
    bottom: 10px;
    left: 50%;
    height: 5px;
    width: 134px;
    border-radius: 5px;
    transform: translateX(-50%);
    background-color: $nav;
  }
}
</style>
