<template>
  <div class="sign-in">
    <header class="logo">
      <LogoUniform/>
      <h2 class="title">Войти в аккаунт</h2>
    </header>
    <section class="form-fields">
      <input type="text" class="input email" placeholder="e-mail">
      <div class="password-box">
        <input
          :type="showPassword ? 'text' :'password'"
          class="input password"
          placeholder="пароль"
        >
        <div class="eye-action" @click="onShowPassword"></div>
      </div>
    </section>
    <section class="actions"></section>
  </div>
</template>

<script>
import LogoUniform from "@/components/common/LogoUniform";
import Icon from "@/components/common/Icon";
import { setTimeout } from "timers";
export default {
  name: "SignIn",
  components: {
    LogoUniform,
    Icon
  },
  data() {
    return {
      showPassword: false
    };
  },
  methods: {
    onShowPassword() {
      this.showPassword = !this.showPassword;
      setTimeout(this.timerForPassword, 1000);
    },
    timerForPassword() {
      this.showPassword = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.sign-in {
  width: 100%;
  height: 100%;

  .logo {
    margin: 26px auto 0;
  }

  .title {
    font-size: $fs_md;
    line-height: 24px;
    text-align: center;
    letter-spacing: 0.4px;
    margin-top: 8px;
    color: $color_darkGrey;
  }

  .password-box {
    width: 100%;
    display: flex;
    position: relative;
    z-index: 1;

    .eye-action {
      position: absolute;
      bottom: 0;
      right: 0;
      z-index: 2;
      height: 50px;
      width: 60px;
      cursor: pointer;
    }
  }

  .form-fields {
    display: flex;
    flex-direction: column;

    .input {
      border: $border-default;
      box-sizing: border-box;
      border-radius: 45px;
      height: 50px;
      margin: 30px 8px 0;
      outline: none;
      padding-left: 40px;
      padding-right: 40px;

      &:focus {
        border: $border-active;
        transition: border 0.1s;
      }

      &::placeholder {
        color: #24282a;
        font-size: $fs_sm;
        position: relative;
        left: 0px;
        top: -1px; // WHY?!?!
      }
    }

    .input.email {
      background-image: url("../../src/assets/icons/icon_email.svg");
      background-repeat: no-repeat;
      background-position: 20px center;
    }

    .input.password {
      background-image: url("../../src/assets/icons/icon_eye.svg");
      background-repeat: no-repeat;
      background-position: calc(100% - 16px) center;

      width: 100%;
    }
  }
}
</style>
