<template>
  <auth-layout>
    <div slot="auth__header">
      <LogoUniform/>
      <div v-if="showStatus" class="error">
        {{ statusText }}
      </div>
      <h2 v-if="!forgotPassword">Войти в аккаунт</h2>
      <h2 v-if="forgotPassword">Забыли пароль</h2>
    </div>

    <div slot="auth__content">
      <div class="form">
        <Field
          id="email"
          labelText="Email"
          type="text"
          class="email"
          placeholder="Enter email"
          name="email"
          :value="email"
          @input="onChange"
          :tooltip="tooltips.email"
          :error="errors.email"
        />
        <Field  v-if="!forgotPassword"
          id="password"
          labelText="Password"
          :type="'password'"
          class="password"
          placeholder="Enter password"
          name="password"
          :value="password"
          @input="onChange"
          :tooltip="tooltips.password"
          :error="errors.password"
        />
        <section class="forgot" v-if="!forgotPassword">
          <span class="forgot__title" @click="onForgotPassword">Забыли пароль?</span>
        </section>
        <TButton v-if="!forgotPassword" view="fluid sign-in_btn" :onClick="onSubmit">Войти</TButton>
        <TButton v-if="forgotPassword" view="fluid sign-in_btn" :onClick="onForgot">Отправить</TButton>
      </div>
    </div>
    <div slot="auth__link">
      <router-link to="/sign-up">
        <TButton view="additional">Зарегистрироваться</TButton>
      </router-link>
    </div>
  </auth-layout>
</template>

<script>
import {
  MUTATION_LOGOUT,
  MUTATION_LOGIN,
  ACTION_LOGIN,
  ACTION_FETCH_USER,
  MUTATION_SET_USER
} from '@/store/constants';
import AuthLayout from "@/layouts/AuthLayout";
import Field from "@common/Field";
import LogoUniform from "@common/LogoUniform";
import TButton from "@common/TButton";
import API from "@/services/ApiService";
import { validateEmail, validatePassword } from "@/services/InputFieldsService";
import { setTimeout } from "timers";
import { PATH_HOME } from "@/router";
import { mapMutations, mapActions } from 'vuex';

export default {
  name: "SignIn",
  components: {
    AuthLayout,
    Field,
    LogoUniform,
    TButton
  },
  data() {
    return {
      email: "team@score.app",
      password: "testTest21!",
      errors: {
        email: "",
        password: ""
      },
      tooltips: {
        username: "",
        email: "",
        password: "не менее 8 знаков"
      },
      forgotPassword: false,
      showStatus: false,
      statusText: ""
    };
  },
  methods: {
    ...mapActions([ACTION_LOGIN, ACTION_FETCH_USER]),
    ...mapMutations([MUTATION_LOGIN, MUTATION_LOGOUT, MUTATION_SET_USER]),
    onChange(name, value) {
      this[name] = value;
    },
    onForgotPassword() {
      this.forgotPassword = !this.forgotPassword;
      this.password = "testTest21";
    },
    onSubmit(event) {
      event.preventDefault();
      const errors = {};
      if (!validateEmail(this.email)) {
        errors.email = "Неверный формат. Пример: example@gmail.com";
      }
      if (!validatePassword(this.password)) {
        errors.password = "Неверный формат. Пример: testTest21!";
      }
      if (Object.keys(errors).length > 0) {
        this.errors = errors;
      } else {
        this.errors = {};
        this.ACTION_LOGIN({
          url: '/auth/token/',
          url2: '/auth/detail/',
          values: {
            email: this.email,
            password: this.password
          }
        })
        .then(data => {
          data.player ? this.$router.push(PATH_HOME) : this.$router.push('profile/me')
        })
        .catch(err => {
          console.log('err', err)
          this.showStatus = true
          this.statusText = err
        });
      }
    },
    onForgot(event) {
      event.preventDefault();
      const errors = {};
      if (!validateEmail(this.email)) {
        errors.email = "Неверный формат. Пример: example@gmail.com";
      }
      if (Object.keys(errors).length > 0) {
        this.errors = errors;
      } else {
        this.errors = {};
      }
      console.log('send letter');
    }
  },
  mounted() {
    this.MUTATION_LOGOUT();
  }
};
</script>

<style lang="scss" scoped>
.logo {
  //margin: 26px auto 0;
  margin: 0 auto;
}
.title {
  font-size: $fs_md;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.4px;
  margin-top: 8px;
  margin-bottom: 30px;
  color: $color_darkGrey;
}
.sign-in_btn {
  margin-top: 30px;
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
.error {
  color: red;
  font-weight: bold;
  text-align: center;
}
</style>
