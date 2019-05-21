<template>
  <main-layout>
    <section class="section">
      <h1>{{ title }}</h1>
      <Ttabs :list="list"/>
        <Field
          id="search"
          labelText="Search"
          type="text"
          class="search"
          placeholder="Search"
          name="search"
          :value="search"
          @input="onChange"
          :tooltip="tooltips.search"
          :error="errors.search"
        />
      <router-view></router-view>
      <TButton view="fluid sign-in_btn" @click="onSubmit">+ Новая  Игра</TButton>
    </section>
  </main-layout>
</template>

<script>
import MainLayout from "@/layouts/MainLayout";
import Ttabs from "@/components/Ttabs";
import Field from "@common/Field";
import TButton from "@common/TButton";
import MyEvents from "@/components/MyEvents";
import AllEvents from "@/components/AllEvents";
export default {
  name: "Home",
  components: {
    MainLayout,
    Ttabs,
    Field,
    TButton,
    MyEvents,
    AllEvents
  },
  data() {
    return {
      title: "Игры и турниры",
      list: [
        { title: "мои игры", classNames: ["active"], to: '/my' },
        { title: "все игры", classNames: [""], to: '/all' }
      ],
      search: "",
      errors: {
        search: "",
      },
      tooltips: {
        search: "",
      },
    };
  },
  methods: {
    onChange(name, value) {
      this[name] = value;
    },
    onSubmit() {
      console.log('submited')
    },
  }
};
</script>
