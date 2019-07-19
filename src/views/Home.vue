<template>
  <main-layout>
    <section class="section">
      <h1>{{ title }} {{templateType}}</h1>
      <Ttabs :list="tabsList"/>

      <div class="queryLine">
        <div class="searchLine">
          <Field
            id="search"
            labelText="Search"
            type="text"
            className='search'
            placeholder=""
            name="search"
            :value="searchQuery"
            @input="onSearchQuery"
          />
          <span class="search__icon" @click="onSearch"><img :src="require(`../assets/icons/search_dark.svg`)" alt/></span>  
        </div>

        <div class="filtersLine">
          <span class="filtersLine__text">{{ activeFilterTitle }}</span>
          <span class="filtersLine__icon" @click="onPopup"><img :src="require(`../assets/icons/filters.svg`)" alt/></span>
        </div>      
      </div>

      <Events :events="fevents" />
      <TButton view="fluid" @click="onAddGame">+ Новая Игра</TButton>

    </section>
    <section name="popup">
      <Popup :visible="isPopupVisible" @onClose="onCloseAction">
        <Filters v-if="popups.isFiltersAllTeamsVisible" :onFilter="onFilter">
          <Radio
            id="allTeams"
            className="radio_popup"
            labelText="Фильтр по дате"
            name="status"
            :options = "filtersList.filtersAllTeams"
            :value="filters.status.name"
            @onRadio="onRadio"
          /> 
        </Filters>
        <Filters v-if="popups.isFiltersMyTeamsVisible" :onFilter="onFilter">
          <Radio
            id="myTeams"
            className="radio_popup"
            labelText="Фильтр по дате"
            name="status"
            :options = "filtersList.filtersMyTeams"
            :value="filters.status.name"
            @onRadio="onRadio"
          />
          <Radio
            id="typeOfEvent"
            className="radio_popup"
            labelText="Фильтр по типу события"
            name="typeOfEvent"
            :options = "filtersList.filtersByType"
            :value="filters.typeOfEvent.name"
            @onRadio="onRadio"
          />
        </Filters>
      </Popup>
    </section>
  </main-layout>
</template>

<script>
import MainLayout from "@/layouts/MainLayout";
import Ttabs from "@/components/Ttabs";
import TButton from "@common/TButton";
import Field from "@common/Field";
import Popup from "@/components/common/Popup";
import Filters from "@/components/Filters";
import Radio from "@common/Radio";
import Events from "@/components/Events";
import API from "@/services/ApiService";
import {filtersList} from "@/services/Filters";
export default {
  name: "Home",
  components: {
    MainLayout,
    Ttabs,
    TButton,
    Field,
    Radio,
    Popup,
    Filters,
    Events
  },
  data() {
    return {
      title: "Игры и турниры",
      templateType: this.$route.params.type,
      tabsList: [
        { title: "мои игры", classNames: ["active"], to: "/events/my" },
        { title: "все игры", classNames: [], to: "/events/all" }
      ],
      events: [],
      fevents: [],
      goals: [],
      baseUrl: "/events/",
      userId: "",
      searchQuery: "",
      activeTab: 1,
      isPopupVisible: false,
      filters: {
        status: {
          name: "all",
          title: "Все"
        },
        typeOfEvent: {
          name: "all",
          title: "Все"
        },
      },
      popups: {
        isFiltersAllTeamsVisible: true,
        isFiltersMyTeamsVisible: false,
      },
      filtersList,
    };
  },
  created() {
    let url = this.baseUrl;
    const activeTab = this.activeTab === 0;
    this.popups.isFiltersAllTeamsVisible = activeTab;
    this.popups.isFiltersMyTeamsVisible = !activeTab;
    //if (this.popups.isFiltersMyTeamsVisible) url = ${this.baseUrl}/${this.userId};
    this.getData(url);
  },
  methods: {
    getData(url) {
      API.fetch(url)
        .then(data => {return data})
        .then(resp => { 
            this.events = resp.map(item => item.data)
            this.fevents = this.events
        })
        .catch(function(ex) {
          console.log("fetch data failed", ex);
        });
    },
    onAddGame() {},
    onSearchQuery(name, value) {
      this.searchQuery = value;
    },
    onCloseAction(){
      this.isPopupVisible = false;
    },
    onPopup(active) {
      this.isPopupVisible = !this.isPopupVisible;
    },
    onFilter() {
      this.fevents = this.events
                        .filter(item => 
                          Object.keys(this.filters)
                            .every(key => (item[key] === this.filters[key].name) || (this.filters[key].name == "all")));


      this.onCloseAction();
    },
    onSearch() {
      console.log(this.searchQuery)
      this.fevents = this.events
                        .filter(item => item.teamA.teamName.indexOf(this.searchQuery) >= 0 || item.teamB.teamName.indexOf(this.searchQuery) >= 0 || item.field.city.indexOf(this.searchQuery) >= 0);
      console.log(this.fevents)
    },
    onRadio(name, value, item) {
      this.filters[name] = item;
    }
  },
  computed: {
    activeFilterTitle() {
      return Object.values(this.filters)[0].title || "all"
    }
  },
  watch: {
    '$route' (to, from) {
      this.templateType = to.params && to.params.type;
    }
  }
};
</script>

<style lang="scss">
  .queryLine{
    display: flex;
    justify-content: space-between;
    height: 50px;
    margin-bottom: 10px;
    position: relative;
  }
  .searchLine{
    height: 100%;
    flex-grow: 1;
  }
  .search {
    width: 100%;
    position: relative;
    &.field {
      margin-bottom: 0;
      .input {
        padding-left: 50px;
      }
    }
  }
  .search__icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 20px;
    width: 18px;
    cursor: pointer;
    img {
      width: 18px;
    }
  }
  .filtersLine{
    margin-left: 10px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 20px;
    position: absolute;
    justify-content: flex-end;
    display: flex;
    align-items: center;
    height: 100%;
    &__text {
      font-size: 14px;
      color: $color_lightGrey;
      margin-right: 10px;
      line-height: 20px;
      display: inline-block;
    }
    &__icon {
      cursor: pointer;
      img {
        width: 18px;
      }
    }
  }
</style>
