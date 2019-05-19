<template>
  <div class="auth">
    <div class="auth__back">
      <a @click="$router.go(-1)">&#12296;</a>
    </div>

    <div class="auth__content">
      <slot name="auth__header"></slot>
      <transition name="fade" appear>
        <slot name="auth__content"></slot>
      </transition>
    </div>

    <div class="auth__link">
      <slot name="auth__link"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "AuthLayout",
  components: {}
};
</script>

<style lang="scss" scoped>
.auth {
  background-color: $bg-main;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 15px;
  &__content {
    background-color: $color_white;
    flex-grow: 1;
    box-shadow: 0px 0px 20px rgba(196, 196, 196, 0.2);
    border-radius: 15px;
    padding: 30px 12px;
    margin: 20px 0;
  }
  &__link {
    text-align: center;
    width: 100%;
    a {
      color: $color_lightGrey;
      font-size: $fs_md;
      letter-spacing: 0.4px;
      text-decoration: none;
    }
  }
  &__back {
    text-align: left;
    a {
      font-weight: bold;
      text-decoration: none;
      color: $color_lightGrey;
      font-size: $fs_md;
    }
  }
}
</style>
