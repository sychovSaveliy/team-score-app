<template>
  <div class="sign-in">
    <header class="logo">
      <LogoUniform/>
      <h2 class="title">Войти в аккаунт</h2>
    </header>
    <section class="form-fields">
      <input v-model="form.email" type="text" class="input email" placeholder="e-mail">
      <div class="password-box">
        <input
          :type="showPassword ? 'text' :'password'"
          v-model="form.password"
          class="input password"
          placeholder="пароль"
        >
        <div class="eye-action" @click="onShowPassword"></div>
      </div>
    </section>
    <section class="forgot">
      <span class="forgot__title">Забыли пароль?</span>
    </section>
    <section class="actions">
      <!-- Заменить на компоненту -->
      <div class="sign-in__action" @click="onSignIn">Войти</div>
    </section>
  </div>
</template>

<script>
import LogoUniform from "@/components/common/LogoUniform";
import API from "@/services/ApiService";
import { validateEmail, validatePassword } from "@/services/InputFieldsService";
import { setTimeout } from "timers";
import { PATH_HOME } from "@/router";
export default {
  name: "SignIn",
  components: {
    LogoUniform
  },
  data() {
    return {
      showPassword: false,
      form: {
        email: "example@gmail.com",
        password: "testTest21!"
      }
    };
  },
  methods: {
    onShowPassword() {
      this.showPassword = !this.showPassword;
      setTimeout(this.timerForPassword, 1000);
    },
    timerForPassword() {
      this.showPassword = false;
    },
    onSignIn() {
      if (!validateEmail(this.form.email)) {
        return console.warn("invalid email");
      }
      if (!validatePassword(this.form.password)) {
        return console.warn("invalid password");
      }

      API.fetch("/login", {
        method: "POST",
        body: {
          email: this.form.email,
          password: this.form.password
        }
      }).then(this.onResponse);
    },
    onResponse(resp) {
      if (resp && resp.info && resp.info.status === "success") {
        window.localStorage.setItem("jwt", "testValue");
        this.$router.push(PATH_HOME);
      }
    }
  },
  mounted() {
    window.localStorage.removeItem("jwt");
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

  .forgot {
    margin-top: 10px;
    &__title {
      color: $color_lightGrey;
      font-size: $fs_xs;
      line-height: 18px;
      text-align: center;
    }
  }
}

.sign-in__action {
  background-color: $tone-green;
  border-radius: 30px;
  padding: 12px;
  height: 50px;
  color: $color_white;
  line-height: 24px;
  font-weight: bold;
  letter-spacing: 0.4px;
  margin: 30px 12px 0;
}
</style>
