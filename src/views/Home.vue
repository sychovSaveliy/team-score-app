<template>
  <main-layout>
    <section class="section">
      <h1>{{ title }}</h1>
      <Ttabs :list="list"/>
      <Search :filter="activeFilter" :onFilter="onFilter" :onSearch="onSearch"/>
      <Events :events="events" />
      <TButton view="fluid" @click="onAddGame">+ Новая Игра</TButton>
    </section>
    <section name="popup">
      <Popup :visible="isPopupVisible" @onClose="onCloseAction">
        <Filters :filters="filtersList01" v-if="popups.isFiltersVisible01" />
        <Filters :filters="filtersList02" v-if="popups.isFiltersVisible02" />
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
import Events from "@/components/Events";
import API from "@/services/ApiService";
export default {
  name: "Home",
  components: {
    MainLayout,
    Ttabs,
    TButton,
    Search,
    Popup,
    Filters,
    Events
  },
  data() {
    return {
      title: "Игры и турниры",
      list: [
        { title: "мои игры", classNames: ["active"], to: "/my" },
        { title: "все игры", classNames: [], to: "/all" }
      ],
      events: [],
      baseUrl: "/events/",
      search: "",
      errors: {
        search: ""
      },
      tooltips: {
        search: ""
      },
      activeFilter: "Будущие",
      filtersList01: [
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
      filtersList02: [
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
        },
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
      ],
      isPopupVisible: false,
      popups: {
        isFiltersVisible01: false,
        isFiltersVisible02: true,        
      }
    };
  },
  created() {
    let url = this.baseUrl;
    this.getData(url);
  },
  methods: {
    getData(url) {
      API.fetch(url)
        .then(data => {
          this.events = data;
          console.log(data)
        })
        .catch(function(ex) {
          console.log("fetch data failed", ex);
        });
    },
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
