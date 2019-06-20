<template>
  <main-layout>
    <section class="section">
      <h1>{{ title }}</h1>
      <Ttabs :list="list"/>
      <Search :filter="activeFilter" :onFilter="onFilter" :onSearch="onSearch"/>
      <router-view></router-view>
      <TButton view="fluid" @click="onAddGame">+ Новая Игра</TButton>
    </section>
    <section name="popup">
      <Popup :visible="isPopupVisible" @onClose="onCloseAction">
        <Filters :filters="filtersList" v-if="isFiltersVisible" />
      </Popup>
    </section>
  </main-layout>
</template>

<script>
import MainLayout from "@/layouts/MainLayout";
import Ttabs from "@/components/Ttabs";
import TButton from "@common/TButton";
import Search from "@/components/Search";
import Popup from "@/components/common/Popup";
import Filters from "@/components/Filters";
export default {
  name: "Home",
  components: {
    MainLayout,
    Ttabs,
    TButton,
    Search,
    Popup,
    Filters
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
      activeFilter: "Будущие",
      filtersList: [
        {
          name: "future",
          title: "Будущие",
          checked: true
        },
        {
          name: "finished",
          title: "Прошлые",
          checked: true
        },
        {
          name: "all",
          title: "Все",
          checked: false
        }
      ],
      isPopupVisible: true,
      isFiltersVisible: true
    };
  },
  methods: {
    onAddGame() {},
    onCloseAction(){
      this.isPopupVisible = false;
    },
    onFilter() {
      this.isPopupVisible = !this.isPopupVisible;
      this.isFiltersVisible = !this.isFiltersVisible;
      console.log(this.isPopupVisible)
    },
    onSearch() {
      console.log('search')
    }
  }
};
</script>
