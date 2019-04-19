<template>
  <div class="login">
    <div class="login__box">
      <SignIn v-show="!registerProcess"></SignIn>
      <SignUp v-if="registerProcess"></SignUp>
    </div>
    <div class="register">
      <span class="register__action" @click="onSignIn">
        Зарегистрироваться
      </span>
    </div>
  </div>
</template>

<script>
import SignIn from '@/components/SignIn';
import SignUp from '@/components/SignUp';

export default {
  name: "Login",
  components: {
    SignIn,
    SignUp
  },
  data() {
    return {
      registerProcess: false
    }
  },
  methods: {
    onSignIn() {
      this.registerProcess = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  background-color: $bg-main;
  height: 100%;
  display: flex;
  flex-direction: column;

  &__box {
    background-color: $color_white;
    margin: 90px 15px 60px;
    height: 550px;
    box-shadow: 0px 0px 20px rgba(196, 196, 196, 0.2);
    border-radius: 15px;
  }

  .register {
    text-align: center;
    width: 100%;

    font-size: $fs_md;
    line-height: 24px;
    text-align: center;
    letter-spacing: 0.4px;
    color: $color_lightGrey;
  }
}
</style>
