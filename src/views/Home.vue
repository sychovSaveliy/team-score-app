<template>
  <main-layout>
    <section class="section">
      <h1>{{ title }}</h1>
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
            @input="onChange"
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
            :value="filters.status"
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
            :value="filters.status"
            @onRadio="onRadio"
          />
          <Radio
            id="type"
            className="radio_popup"
            labelText="Фильтр по типу события"
            name="type"
            :options = "filtersList.filtersByType"
            :value="filters.type"
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
      tabsList: [
        { title: "мои игры", classNames: ["active"], to: "/my" },
        { title: "все игры", classNames: [], to: "/all" }
      ],
      events: [],
      fevents: [],
      goals: [],
      eventsData: [],
      baseUrl: "/events/",
      userId: "",
      searchQuery: "",
      activeTab: 1,
      isPopupVisible: false,
      filters: {
        status: "all",
        type: "all",
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
      //url = ${this.baseUrl}/${this.userId};
    
    this.getData(url);
  },
  methods: {
    getData(url) {
      API.fetch(url)
        .then(data => {
          this.events = data;
          this.fevents = data;


          return data;
        })
        .then(resp => { 
            this.eventsData = resp.map(item => item.data && item.data.data).filter(item => item)
        })
        .catch(function(ex) {
          console.log("fetch data failed", ex);
        });
    },
    onAddGame() {},
    onChange() {},
    onCloseAction(){
      this.isPopupVisible = false;
    },
    onPopup(active) {
      this.isPopupVisible = !this.isPopupVisible;
    },
    onFilter() {
      // let filteredList = [];
      // this.events.forEach(item => {
      //   let flag = Object.keys(this.filters).every(key => {
      //       return (item.data[key] === this.filters[key]) || (this.filters[key] == "all")
      //   })
      //   if(flag) filteredList.push(item)
      // })
      // this.fevents = filteredList;
      this.fevents = this.events
                        .filter(item => 
                          Object.keys(this.filters)
                            .every(key => (item.data[key] === this.filters[key]) || (this.filters[key] == "all")));


      this.onCloseAction();
    },
    onSearch() {
      console.log('search')
    },
    onRadio(name, value, item) {
      // TODO: apply item to filter
      this.filters[name] = value;
    },
    groupBy(objectArray, property) {
      return objectArray.reduce(function (acc, obj) {
        var key = obj[property];
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
      }, {});
    },
    //var groupedPeople = groupBy(people, 'age');
  },
  computed: {
    activeFilterTitle() {
      return Object.values(this.filters)[0]
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
