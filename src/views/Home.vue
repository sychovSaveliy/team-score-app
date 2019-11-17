<template>
  <main-layout>
    <section class="section">
      <h1>{{ title }}</h1>
      <Ttabs :list="tabsList" :activeTab="templateType" />

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
      <Events />
      <TButton view="fluid" @click="onAddGame"><router-link to="/event/new/">+ Новая Игра</router-link></TButton>

    </section>
    <section name="popup">
      <Popup :visible="isPopupVisible" @onClose="onCloseAction">
        <Filters v-if="templateType === 'all'" :onFilter="onFilter">
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
        <Filters v-if="templateType === 'my'" :onFilter="onFilter">
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
import {
  MUTATION_UPDATE_EVENTS,
  MUTATION_UPDATE_FILTERS,
  ACTION_FETCH_EVENTS,
  ACTION_FILTER_EVENTS
} from '@/store/constants';
import MainLayout from "@/layouts/MainLayout";
import Ttabs from "@/components/Ttabs";
import TButton from "@common/TButton";
import Field from "@common/Field";
import Popup from "@/components/common/Popup";
import Filters from "@/components/Filters";
import Radio from "@common/Radio";
import Events from "@/components/Events";
import { filtersList } from "@/services/Filters";
import API from "@/services/ApiService";
import { mapState, mapMutations, mapActions } from 'vuex';
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
      templateType: this.$route.params.type || 'my',
      tabsList: [
        { id: "my", title: "мои игры", to: "/events/my" },
        { id: "all", title: "все игры", to: "/events/all" }
      ],
      goals: [],
      baseUrl: "/events/",
      userId: "",
      searchQuery: "",
      isPopupVisible: false,
      popups: {
        isFiltersAllTeamsVisible: true,
        isFiltersMyTeamsVisible: false,
      },
      filtersList,
    };
  },
  created() {
    let url = this.baseUrl;
    if (this.templateType === 'my') 
      { url = this.baseUrl}
    this.ACTION_FETCH_EVENTS({ url });
  },
  methods: {
    ...mapActions([ACTION_FETCH_EVENTS, ACTION_FILTER_EVENTS]),
    ...mapMutations([MUTATION_UPDATE_FILTERS]),
    getData(url) { // unnecessary code
    //   this.$store.dispatch({
    //    type: ACTION_FETCH_EVENTS,
    //    url
    //  })
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
      this.ACTION_FILTER_EVENTS({
        method: 'filter',
        events: this.events
      });
      this.onCloseAction();
    },
    onSearch() {
      this.ACTION_FILTER_EVENTS({
        method: 'search',
        events: this.events,
        searchQuery: this.searchQuery
      });
    },
    onRadio(name, value, item) {
      // workshop
      this.MUTATION_UPDATE_FILTERS({name, value: item})
      //this.filters[name] = item;
    }
  },
  computed: {
    activeFilterTitle() {
      return Object.values(this.filters)[0].title || "all"
    },
    ...mapState([
      'events',
      'fevents',
      'filters'
    ])
  },
  watch: {
    '$route' (to, from) {
      this.templateType = to.params.type;
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
