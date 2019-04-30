<template>
  <div class="page-not-found">
    <span class="page-not-found__main-digits">404</span>
    <span>Страница не найдена</span>
  </div>
</template>

<script>
export default {
  name: 'PageNotFound',
  data() {
    return {}
  }
}
</script>

<style lang="scss">
@import '@/styles/_variables.scss';
.page-not-found {
  height: 100%;
  color: $tone-green;
  display: flex;
  flex-direction: column;;
  justify-content: center;
  align-items: center;

  &__main-digits {
    font-size: 72px;
  }
}

</style>


