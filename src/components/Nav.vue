<template>
    <nav class="nav">
      <ul class="nav__list">
        <li class="nav__link"><router-link to="/" exact>Главная</router-link></li>
        <li class="nav__link"><router-link to="/score">Рейтинг</router-link></li>
        <li class="nav__link"><router-link to="/profile">Профиль</router-link></li>
        <li class="nav__link"><router-link to="/events">Игры</router-link></li>
        <li class="nav__link"><router-link to="/search">Поиск</router-link></li>
        <li class="nav__link"><router-link to="/messages">Сообщения</router-link></li>
      </ul>
    </nav>
</template>

<script>
export default {
  name: "Nav",
  data () {
    return {
    }
  },
};
</script>

<style lang="scss">
.nav{
  &__list{
    margin: 0;
    padding: 0;
    list-style: none;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__link{
    padding: 0 10px;
  }
}
</style>
