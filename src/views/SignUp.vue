<template>
  <auth-layout>
    <div slot="auth__header">
      <div v-if="showStatus"  class="error">
        {{ statusText }}
      </div>
      <h2>Зарегистрировать аккаунт</h2>
    </div>

    <div slot="auth__content">
      <div>
        <div class="form">
          <Field
            id="username"
            labelText="Username"
            type="text"
            class
            placeholder="Enter username"
            name="username"
            :value="username"
            @input="onChange"
            :tooltip="tooltips.username"
            :error="errors.username"
          />
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
          <Field
            id="password"
            labelText="Password"
            type="password"
            class="password"
            placeholder="Enter password"
            name="password"
            :value="password"
            @input="onChange"
            :tooltip="tooltips.password"
            :error="errors.password"
          />
          <TButton :onClick="onSubmit">Зарегистрироваться</TButton>
        </div>
      </div>
    </div>

    <div slot="auth__link">
      <span v-if="!showStatus">Уже есть аккаунт?</span>
      <router-link to="/sign-in">
        <TButton view="additional inline">Войти</TButton>
      </router-link>
    </div>
  </auth-layout>
</template>

<script>
import {
  MUTATION_LOGOUT
} from '@/store/constants';
import AuthLayout from "@/layouts/AuthLayout";
import Field from "@common/Field";
import Check from "@common/Check";
import TButton from "@common/TButton";
import LogoUniform from "@common/LogoUniform";
import API from "@/services/ApiService";
import {
  validateName,
  validateEmail,
  validatePassword
} from "@/services/InputFieldsService";
import { mapMutations, mapActions } from 'vuex';

export default {
  name: "SignUp",
  components: {
    AuthLayout,
    Field,
    Check,
    LogoUniform,
    TButton
  },
  data() {
    return {
      username: "",
      email: "",
      password: "",
      errors: {
        username: "",
        email: "",
        password: ""
      },
      tooltips: {
        username: "",
        email: "",
        password: "не менее 8 знаков"
      },
      showStatus: false,
      statusText: '',
      showPassword: false
    };
  },
  mounted() {
    this.MUTATION_LOGOUT();
  },
  methods: {
    ...mapMutations([MUTATION_LOGOUT]),
    onChange(name, value) {
      this[name] = value;
    },
    onCheck(name, checked) {
      this[name] = checked;
    },
    onShowPassword() {
      this.showPassword = !this.showPassword;
      setTimeout(this.timerForPassword, 1000);
    },
    timerForPassword() {
      this.showPassword = false;
    },
    onSubmit(event) {
      event.preventDefault();
      const errors = {};

      if (!validateName(this.username)) {
        errors.username = "Используйте только буквы, не меньше 3";
      }
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
        console.log(
          "submit",
          this.username,
          this.email,
          this.password
        );

        API.fetch("/auth/create/", {
          method: "POST",
          body: {
            first_name: this.username,
            email: this.email,
            password: this.password
          }
        })
        .then(this.onResponse)
        .catch(err => {
          this.showStatus = true
          this.statusText = err
        })
      }
    },
    onResponse(resp) {
      console.log('registred')
      this.username = "";
      this.email = "";
      this.password = "";
      this.showStatus = true;
      this.statusText = 'Вам было отправлено письмо!!!';
    }
  }
};
</script>

<style lang="scss" scoped>
.error {
  color: red;
  font-weight: bold;
  text-align: center;
}
</style>
