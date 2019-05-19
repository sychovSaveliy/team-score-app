<template>
  <auth-layout>

    <div slot="auth__header">
      <h2 v-if="!regStatus">Зарегистрировать аккаунт</h2>
      <div v-if="regStatus">
        <LogoUniform/>
        <h2>Подтверждение</h2>
      </div>
    </div>

    <div slot="auth__content">

      <div v-if="regStatus">
        <div>Ваше подтверждение было отправленно вам на адрес</div>
      </div>

      <div v-if="!regStatus">
        <form class="form">
          <Field
            id="username"
            labelText="Username"
            type="text"
            className=""
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
            className="email"
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
              className="password"
              placeholder="Enter password"
              name="password"
              :value="password"
              @input="onChange"
              :tooltip="tooltips.password"
              :error="errors.password"
            />
          <Check
            id="agreeTerms"
            className="check"
            type="checkbox"
            labelText="Confirm the Terms"
            name="agreeTerms"
            :checked="agreeTerms"
            @change="onCheck"
            :error="errors.agreeTerms"
          />
          <button
            type="submit"
            class="btn"
            @click="onSubmit"
          >
          Зарегистрироваться
          </button>
         </form> 
      </div>
    </div>

    <div slot="auth__link">
      <span v-if="!regStatus">Уже есть аккаунт?</span>
      <router-link to="/sign-in">Войти</router-link>
    </div> 
      
  </auth-layout>
</template>

<script>
import AuthLayout from '@/layouts/AuthLayout';
import Field from '@/components/common/Field';
import Check from '@/components/common/Check';
import LogoUniform from "@/components/common/LogoUniform";
import API from "@/services/ApiService";
import { validateName, validateEmail, validatePassword } from "@/services/InputFieldsService";

export default {
  name: "SignUp",
  components: {
    AuthLayout,
    Field,
    Check,
    LogoUniform
  },
  data() {
    return {
      username: "",
      email: "",
      password: "",
      agreeTerms: true,
      errors: {
        username: "",
        email: "",
        password: "",
        agreeTerms: ""
      },
      tooltips: {
        username: "",
        email: "",
        password: "не менее 8 знаков",
      },
      regStatus: false,
      showPassword: false,
    }
  },
  methods: {
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
        errors.username = "Must be 3 characters or more, only letters";
      }
      if (!validateEmail(this.email)) {
        errors.email = "Неверный формат. Пример: example@gmail.com";
      }
      if (!validatePassword(this.password)) {
        errors.password = "Неверный формат. Пример: testTest21!";
      }

      if (!this.agreeTerms) {
        errors.agreeTerms = "You should agree";
      }

      if (Object.keys(errors).length > 0) {
        this.errors = errors
      } else {
        this.errors = {}
        console.log("submit", this.username, this.email, this.password, this.agreeTerms);

        API.fetch("/sign-up", {
          method: "POST",
          body: {
            name: this.username,
            email: this.email,
            password: this.password,
            agreeTerms: this.agreeTerms
          }
        });  
        //}).then(this.onResponse);
        this.username = "";
        this.email = "";
        this.password = "";
        this.agreeTerms = true;
        this.regStatus = true;
      }  
    },
    onResponse(resp) {
      if (resp && resp.info && resp.info.status === "success") {
          this.username = "";
          this.email = "";
          this.password = "";
          this.agreeTerms = true;
          this.regStatus = true;
      }
    },
  }  
}
</script>

<style lang="scss" scoped>
.btn {
  border: none;
  background-color: $tone-green;
  border-radius: 30px;
  padding: 12px;
  height: 50px;
  color: $color_white;
  font-size: $fs_md;
  line-height: 24px;
  font-weight: bold;
  letter-spacing: 0.4px;
  margin: 30px 0 0;
  width: 100%;
}
</style>
