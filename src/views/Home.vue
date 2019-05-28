<template>
  <main-layout>
    <section class="section">
      <h1>{{ title }}</h1>
      <Ttabs :list="list"/>
      <Search :filter="filter" />
      <router-view></router-view>
      <TButton view="fluid sign-in_btn" @click="onAddGame">+ Новая Игра</TButton>
    </section>
  </main-layout>
</template>

<script>
import MainLayout from "@/layouts/MainLayout";
import Ttabs from "@/components/Ttabs";
import Field from "@common/Field";
import TButton from "@common/TButton";
import Search from "@/components/Search";
export default {
  name: "Home",
  components: {
    MainLayout,
    Ttabs,
    Field,
    TButton,
    Search
  },
  data() {
    return {
      title: "Игры и турниры",
      list: [
        { title: "мои игры", classNames: ["active"], to: "/my" },
        { title: "все игры", classNames: [], to: "/all" }
      ],
      search: "",
      errors: {
        search: ""
      },
      tooltips: {
        search: ""
      },
      filter: "Будущие"
    };
  },
  methods: {
    onAddGame() {},
  }
};
</script>
